import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';

import { CreatePostDto } from './dtos/createPostDto';
import { UpdatePostDto } from './dtos/updatePostDto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { Roles } from 'src/auth/decorators/rolesDecorators';
import { Role } from 'prisma/generated/prisma/enums';
import { RolesGuard } from 'src/auth/guards/rolesGuard';

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
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() postDetails: CreatePostDto) {
    return await this.postsService.createPost(postDetails);
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() postDetails: UpdatePostDto) {
    return await this.postsService.updatePost(id, postDetails);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }

}
