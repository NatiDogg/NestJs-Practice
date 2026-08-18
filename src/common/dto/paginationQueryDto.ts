//localhost:3000/posts?page=1&limit=10
import { Type } from 'class-transformer'
import { Min, IsOptional, IsInt, Max} from 'class-validator'
export class PaginationQueryDto{
      
       @IsOptional()
       @Type(()=> Number)
       @IsInt({message: 'Page must be an integer'})
       @Min(1,{message: 'Page must be at least 1'})
        page?: number = 1

         @IsOptional()
       @Type(()=> Number)
       @IsInt({message: 'Limit must be an integer'})
       @Min(1,{message: 'Limit must be at least 1'})
       @Max(100,{message: 'Limit can not exceed 100'})
        limit?: number = 10

    




     
        
      
}