import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto{

      @IsNotEmpty({message: 'Name is Required'})
      @IsString({message: 'Name should be a string'})
      @MinLength(4,{message: 'Name should be atleast 4 characters long'})
      @MaxLength(50,{message: 'Name should not exceed 50 characters'})

      name!: string

      @IsEmail({},{message: 'please provide a valid email '})
      email!: string

      @IsNotEmpty({message: 'Password is Required'})
      @MinLength(6,{message: "Password must be atleast 6 characters long"})
      password!: string



}