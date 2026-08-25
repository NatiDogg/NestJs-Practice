import { Controller,Post,Get, Delete, Param, UseGuards, UseInterceptors, UploadedFile, Body, BadRequestException } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuthGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/decorators/currentUserDecorator';
import { User } from 'prisma/generated/prisma/client';
import { UploadFileDto } from './dto/uploadFileDto';

@Controller('file-upload')
export class FileUploadController {

      constructor(private readonly fileUploadService:FileUploadService){}

      @Post("")
      @UseGuards(JwtAuthGuard)
      @UseInterceptors(FileInterceptor('file'))
      async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() uploadFileDto:UploadFileDto ,@CurrentUser() user: Omit<User, 'password'>){
           if(!file){
             throw new BadRequestException("File is Required")
           }
          return await this.fileUploadService.uploadFile(file, user, uploadFileDto.desciption)
      }

      @Get("")
      async findAll(){
          return await this.fileUploadService.findAll()
      }
      
      @Delete(":id")
      async deleteFile(@Param('id') id: string){
           return await this.fileUploadService.deleteFile(id)
      }
}
