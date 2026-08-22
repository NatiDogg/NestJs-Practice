import {v2 as cloudinary} from 'cloudinary'
import {env} from '../../../src/utils/envValidation'
export const cloudinaryProvider = {
      provide: 'CLOUDINARY',
      useFactory: ()=>{
           cloudinary.config({
             api_key: env.API_KEY,
             cloud_name: env.CLOUD_NAME,
             api_secret: env.API_SECRET
           })
      }
}