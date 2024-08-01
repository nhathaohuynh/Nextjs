import { z } from 'zod'

const configEnvSchema = z.object({
	NEXT_PUBLIC_API_ENDPOINT: z.string(),
})

const configProject = configEnvSchema.safeParse({
	NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
})

if (!configProject.success) {
	console.log(configProject.error.issues)
	throw new Error(configProject.error.errors[0].message)
}

const envConfig = configProject.data

export default envConfig
