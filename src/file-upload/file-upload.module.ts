import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService],
  imports:[CloudinaryModule, MulterModule.register({
    storage: memoryStorage()
  })]
})
export class FileUploadModule {}
