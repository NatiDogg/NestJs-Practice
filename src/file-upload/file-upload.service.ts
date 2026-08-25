import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryServiceProvider } from './cloudinary/cloundinaryService';
import { Image, User } from 'prisma/generated/prisma/client';

@Injectable()
export class FileUploadService {

        constructor(private prisma: PrismaService, private readonly cloudinaryService:CloudinaryServiceProvider){}



    async uploadFile(file: Express.Multer.File,user: User, description? : string, ): Promise<Image>{
         try {
              const cloudinaryResponse = await this.cloudinaryService.uploadFile(file)
          if(!cloudinaryResponse){
             throw new BadRequestException("Some thing went wrong")
          }
          const newlyCreatedFile = await this.prisma.image.create({
             data: {
                 imageUrl: cloudinaryResponse.secure_url,
                 publicId: cloudinaryResponse.public_id,
                 userId: user.id,
                 mimeType: file.mimetype,
                 size: file.size,
                 originalName: '',
                 description

             },
             include:{uploader: true}
          })

          return newlyCreatedFile
         } catch (error) {
             throw error
         }
    }
    async findAll():Promise<Image[]>{
        return await this.prisma.image.findMany({
             orderBy: {
                createdAt: 'desc'
             }
        })
    }

    async deleteFile(publicId: string){
          
            try {
                const deletedImage = await this.prisma.image.deleteMany({
                     where:{
                        publicId
                     }
                })

                if (deletedImage.count === 0) {
                 throw new NotFoundException(`Image with public Id: ${publicId} not found`)
               }

               const cloudinaryResult = await this.cloudinaryService.deleteFile(publicId)

               if(!cloudinaryResult || cloudinaryResult.result !== 'ok'){
                 console.warn(`Cloudinary cleanup failed for asset ${publicId}`);
               }
               return { message: 'Image deleted successfully' };

               
            } catch (error) {
                 throw error
            }
    }
}
