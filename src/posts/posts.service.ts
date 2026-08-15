import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dtos/createPostDto';
import { UpdatePostDto } from './dtos/updatePostDto';
import { Post, Prisma } from 'prisma/generated/prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
@Injectable()
export class PostsService {

     constructor(private prisma:PrismaService){}

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

     async findAll(): Promise<Post[]>{
        return await this.prisma.post.findMany()
     }

     async findOne(id: string): Promise<Post>{
          const post = await this.prisma.post.findUnique({where: {id}})
          if(!post){
            throw new NotFoundException(`Post with ID: ${id} not found`)
          }
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
