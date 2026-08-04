import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

import { CreatePostDto } from './dtos/createPostDto';
import { UpdatePostDto } from './dtos/updatePostDto';
import { PostExistPipe } from './pipes/postExistPipe';

@Controller('posts')
export class PostsController {

  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe, PostExistPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPost(@Body() postDetails: CreatePostDto) {
    return this.postsService.createPost(postDetails);
  }

  @Patch(':id')
  updatePost(@Param('id', ParseIntPipe, PostExistPipe) id: number, @Body() postDetails: UpdatePostDto) {
    return this.postsService.updatePost(id, postDetails);
  }

  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe, PostExistPipe) id: number) {
    return this.postsService.deletePost(id);
  }

}
