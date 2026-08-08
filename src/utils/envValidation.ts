import {z} from 'zod'

const envSchema = z.object({
    APP_NAME: z.string().min(5),
    DATABASE_URL: z.string().min(4)
})

export const validate = (config:Record<string,unknown>)=>{
         return envSchema.parse(config)
}

export type envConfig = z.infer<typeof envSchema>