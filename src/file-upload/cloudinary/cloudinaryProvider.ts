import {v2 as cloudinary} from 'cloudinary'
import {env} from '../../../src/utils/envValidation'
export const cloudinaryProvider = {
      provide: 'CLOUDINARY',
      useFactory: async()=>{
          console.log('--- Cloudinary Config Debug ---');
    console.log('CLOUD_NAME:', env.CLOUD_NAME);
    console.log('API_KEY:', env.API_KEY);
    console.log('API_SECRET:', env.API_SECRET);
    console.log('-------------------------------');
           cloudinary.config({
             api_key: env.API_KEY,
             cloud_name: env.CLOUD_NAME,
             api_secret: env.API_SECRET
           })
            try {
    const result = await cloudinary.api.ping();
    console.log('CLOUDINARY CONNECTED:', result);
  } catch (error) {
    console.error('CLOUDINARY FAILED:', error);
  }

           // return configured cloudinary instance
           return cloudinary
      }
}