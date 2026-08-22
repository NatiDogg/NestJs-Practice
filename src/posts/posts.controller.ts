import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param,  Patch, Post, UseGuards,Query } from '@nestjs/common';
import { PostsService } from './posts.service';

import { CreatePostDto } from './dtos/createPostDto';
import { UpdatePostDto } from './dtos/updatePostDto';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { Roles } from 'src/auth/decorators/rolesDecorators';
import { Role } from 'prisma/generated/prisma/enums';
import { RolesGuard } from 'src/auth/guards/rolesGuard';
import { CurrentUser } from 'src/auth/decorators/currentUserDecorator';
import { User } from 'prisma/generated/prisma/client';
import { FindPostsQueryDto } from './dtos/findPostsQueryDto';

@Controller('posts')
export class PostsController {

  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Query() queryDetails:FindPostsQueryDto) {
    return await this.postsService.findAll(queryDetails);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() postDetails: CreatePostDto, @CurrentUser() user:Omit<User, 'password'>) {
    return await this.postsService.createPost(postDetails, user.id );
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() postDetails: UpdatePostDto) {
    return await this.postsService.updatePost(id, postDetails);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @HttpCode(HttpStatus.OK)
  deletePost(@Param('id') id: string, @CurrentUser() user: Omit<User, 'password'>) {
    return this.postsService.deletePost(id, user.id);
  }

}
