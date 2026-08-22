import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dtos/createPostDto';
import { UpdatePostDto } from './dtos/updatePostDto';
import { Post, Prisma } from 'prisma/generated/prisma/client';
import { CACHE_MANAGER,Cache } from '@nestjs/cache-manager';
import { FindPostsQueryDto } from './dtos/findPostsQueryDto';
import { PaginationResponse } from 'src/common/interfaces/paginationResponseInterface';
@Injectable()
export class PostsService {

     private postListCacheKeys: Set<string> = new Set()

     constructor(@Inject(CACHE_MANAGER) private cacheManager:Cache,private prisma:PrismaService){}

     private generatePostsListCacheKey(query: FindPostsQueryDto): string{
           const {page = 1, limit = 10, title} = query

           return `posts_list_page${page}_limit${limit}_title${title || 'all'}`


     }

     async createPost(postDetails:CreatePostDto, userId: string): Promise<{success:boolean, message: string, post: Post}>{
        try {
          const newlyCreatedPost = await this.prisma.post.create({data:{
           ...postDetails,
           userId: userId
        }})

        return {
         success: true,
         message: 'Post Created Successfully',
         post: newlyCreatedPost
        }
        } catch (error) {
          throw error
        }
     }

     async findAll(query: FindPostsQueryDto): Promise<PaginationResponse<Post>>{

       const cacheKey = this.generatePostsListCacheKey(query)

       this.postListCacheKeys.add(cacheKey)

       const getCachedData = await this.cacheManager.get<PaginationResponse<Post>>(cacheKey)

       if(getCachedData){
           console.log(`Cache Hit ====== returning posts list from Cache ${cacheKey}`)
           return getCachedData
       }
        console.log(`Cache miss ====== returning posts list from db`)

        const {page = 1, limit = 10, title}  = query

        const skip = (page - 1) * limit
         const whereCondition = title ? {title: {contains: title,mode: 'insensitive' as const}} : {}
       

         const [posts,totalCount] = await this.prisma.$transaction([
              this.prisma.post.findMany({
                where: whereCondition,
                include: {user: true},
                skip: skip,
                take: limit,
                orderBy: {createdAt: 'desc'}
              }),
              this.prisma.post.count({
                 where: whereCondition,
               }),
         ])

       const response = {
            items: posts,
            meta:{
               currentPage: page,
               totalItems: totalCount,
               itemsPerPage: limit,
               totalPages: Math.ceil(totalCount / limit),
                hasPreviousPage: page > 1,
                hasNextPage: page < Math.ceil(totalCount / limit)
            }
         }

         await this.cacheManager.set(cacheKey, response,30000)

         return response
         

         







            
         
       
     }

     async findOne(id: string): Promise<Post>{
           const cacheKey =  `post_${id}`
           const cachedPost = await this.cacheManager.get<Post>(cacheKey)
            if(cachedPost){
               console.log(`Cache Hit ====== returning post list from Cache ${cacheKey}`)
               return cachedPost
            }
           console.log(`Cache miss ====== returning post list from db`)
          const post = await this.prisma.post.findUnique({where: {id}})

          if(!post){
            throw new NotFoundException(`Post with ID: ${id} not found`)
          }
           await this.cacheManager.set(cacheKey, post,30000)
          return post
     }

     async updatePost(id: string,updatePostDetails:UpdatePostDto):Promise<Post>{
          try {
             const updatedPost = await this.prisma.post.update({
                where:{id},
                data:{
                   ...updatePostDetails
                }
             })
             return updatedPost
          } catch (error) {
              if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'){
                 throw new NotFoundException('Post not found');
              }
              throw error
          }
     }

     async deletePost(id: string, userId: string){
         try {
           const result =  await this.prisma.post.deleteMany({where:{
                id,
                userId: userId
            }})
            if(result.count === 0){
                throw new NotFoundException(`Post with ID ${id} not found or unauthorized`);
            }
            return {
               success: true,
               message: 'Post deleted Sucessfully'
            }
         } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new NotFoundException(`Post with ID ${id} not found`);
            }
            throw error;
         }
     }

      


}
