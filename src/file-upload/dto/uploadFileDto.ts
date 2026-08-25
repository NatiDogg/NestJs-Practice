import { IsOptional, IsString, MaxLength } from "class-validator";



export class UploadFileDto{
      
     @IsOptional()
     @IsString({message: 'Description must be a string'})
     @MaxLength(500,{message: 'Description must not exceed 500 characters'})
     desciption?: string
}
