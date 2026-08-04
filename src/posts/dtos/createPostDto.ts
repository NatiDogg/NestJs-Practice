import {IsString,IsNotEmpty, MinLength, MaxLength} from 'class-validator'

export class CreatePostDto{
      
     @IsNotEmpty({message: 'Title is Required'})
     @IsString({message: 'Title must be a string'})
     @MinLength(3,{message: 'Title must be at least 3 characters long'})
      @MaxLength(50,{message: 'Title must not exceed more than 50 characters'})
     title!: string

      
     @IsNotEmpty({message: 'Content is Required'})
     @IsString({message: 'Content must be a string'})
     @MinLength(3,{message: 'Content must be at least 3 characters'})
     @MaxLength(100,{message: 'Content must not exceed more than 100 characters'})
     content!: string

     @IsNotEmpty({message: 'authorName is Required'})
     @IsString({message: 'authorName must be a string'})
     @MinLength(3,{message: 'authorName must be at least 3 characters long'})
     authorName!: string



      

      
     
}