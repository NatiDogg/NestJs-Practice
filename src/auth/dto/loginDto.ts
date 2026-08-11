import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LoginDto{
      
      @IsEmail({}, {message: 'please provide a valid email '})
            email!: string

      @IsNotEmpty({message: 'Password is Required'})
      @MinLength(6,{message: "Password must be atleast 6 characters long"})
            password!: string

    

}