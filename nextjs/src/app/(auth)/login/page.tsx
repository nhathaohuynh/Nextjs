'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import LoginForm from './login-form'

const loginSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
	password: z.string().min(3, {
		message: 'Password must be at least 3 characters.',
	}),
})

type loginFormValues = z.infer<typeof loginSchema>

const Login = () => {
	const formLogin = useForm<loginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onSubmitLoginForm = async (values: loginFormValues) => {
		console.log(values)
	}
	return (
		<section className=' p-16 rounded-md shadow-sm mt-10 border'>
			<h1 className='text-3xl mb-8'>Login Account</h1>
			<div>
				<LoginForm />
			</div>
		</section>
	)
}

export default Login
