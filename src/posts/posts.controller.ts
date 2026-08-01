import { Body, Controller,Delete,Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostInterface } from './interface/postInterface';

@Controller('posts')
export class PostsController {

      constructor(private readonly postsService:PostsService){}


      @Get()
      findAll(){
        return this.postsService.findAll()
      }
      @Get(':id')
      @HttpCode(HttpStatus.OK)
      findOne(@Param('id',ParseIntPipe) id: number){
            return this.postsService.findOne(id)
      }

      @Post()
      @HttpCode(HttpStatus.CREATED)
      createPost(@Body() postDetails: Omit<PostInterface, 'createdAt'>){
             return this.postsService.createPost(postDetails)
      }

      @Patch(':id')
      updatePost(@Param('id',ParseIntPipe) id: number,@Body() postDetails: Omit<PostInterface, 'createdAt'>){
          this.postsService.updatePost(id,postDetails)
      }

      @Delete(':id')
      deletePost(@Param('id',ParseIntPipe) id: number){
           return this.postsService.deletePost(id)
      }

}
