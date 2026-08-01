import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interface/postInterface';

@Injectable()
export class PostsService {

      private posts: Post[] = [
           {
            id: 1,
            title: "First Post",
            content: "First Post Content",
            authorName: "nati",
            createdAt: new Date
           },
           {
            id: 2,
            title: "Second Post",
            content: "Second Post Content",
            authorName: "yonas",
            createdAt: new Date
           },
           {
            id: 3,
            title: "Third Post",
            content: "Third Post Content",
            authorName: "abebe",
            createdAt: new Date
           }
      ]

      findAll(): Post[]{
         return this.posts
      }
      findOne(id: number):Post{
         const post = this.posts.find((post)=> post.id === id)
         if(!post){
            throw new NotFoundException(`Post with ID: ${id} is not found`)
         }
         return post
      }
      createPost(postDetails: Omit<Post, 'createdAt' | 'id'>):Post[]{

         const newlyCreatedPost:Post = {
            id: this.posts.length + 1,
             ...postDetails,
             createdAt: new Date
             
         }
         this.posts.push(newlyCreatedPost)
         return this.posts
         

         
      }
      updatePost(id: number, updatePostDetails:Partial<Omit<Post, 'createdAt' | 'id'>>): Post[]{
         
         const postIndex = this.posts.findIndex((post)=> post.id === id);
         if(postIndex === -1){
              throw new NotFoundException(`Post with ID: ${id} is not found`)
         }

         this.posts[postIndex] = {
             ...this.posts[postIndex],
             ...updatePostDetails,
             updatedAt: new Date
         }
         return this.posts


      }
      deletePost(id: number): {success: boolean, message: string, data: Post[]}{
         const postIndex = this.posts.findIndex((post)=> post.id === id);
          if(postIndex === -1){
             throw new NotFoundException(`Post with ID: ${id} is not found`)
          }
          this.posts.splice(postIndex,1)
          return {
            success: true,
            message: 'Post Deleted Successfully',
            data: this.posts
          }
      }


}
