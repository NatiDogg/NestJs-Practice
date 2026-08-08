import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

import { CreatePostDto } from './dtos/createPostDto';
import { UpdatePostDto } from './dtos/updatePostDto';
import { PostExistPipe } from './pipes/postExistPipe';

@Controller('posts')
export class PostsController {

  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() postDetails: CreatePostDto) {
    return await this.postsService.createPost(postDetails);
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() postDetails: UpdatePostDto) {
    return await this.postsService.updatePost(id, postDetails);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }

}
