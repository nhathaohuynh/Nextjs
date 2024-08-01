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
		<Form {...formLogin}>
			<form onSubmit={formLogin.handleSubmit(onSubmitLoginForm)}>
				<FormField
					control={formLogin.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='Example: huynh nhat hao' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit'>Login</Button>
			</form>
		</Form>
	)
}

export default Login
