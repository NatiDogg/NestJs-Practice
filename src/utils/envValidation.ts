import {z} from 'zod'
import {config} from 'dotenv'
config()
const envSchema = z.object({
    APP_NAME: z.string().min(5),
    DATABASE_URL: z.string().min(4),
    JWT_ACCESS_TOKEN: z.string().min(4),
    JWT_REFRESH_TOKEN: z.string().min(4),
    CLOUD_NAME: z.string().min(4),
    API_SECRET: z.string().min(4),
    API_KEY: z.string().min(4)

})

export const validate = (config:Record<string,unknown>)=>{
         return envSchema.parse(config)
}
export const env = envSchema.parse(process.env)
export type envConfig = z.infer<typeof envSchema>