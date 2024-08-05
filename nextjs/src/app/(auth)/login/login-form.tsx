'use client'

import { useAppContext } from '@/app/app-provider'
import { LoginBody, LoginBodyType } from '@/app/schemas/auth.schema'
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
import { useToast } from '@/components/ui/use-toast'
import envConfig from '@/config'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
const LoginForm = () => {
	const { toast } = useToast()
	const { setSessionToken } = useAppContext()
	const [loading, setLoading] = useState(false)
	const loginForm = useForm<LoginBodyType>({
		resolver: zodResolver(LoginBody),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmitLoginForm = async (values: LoginBodyType) => {
		setLoading(true)
		try {
			const result = await fetch(
				`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
				{
					body: JSON.stringify(values),
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				},
			).then(async (res) => {
				const payload = await res.json()

				const data = {
					statusCode: res.status,
					payload,
				}
				if (!res.ok) {
					throw data
				}

				return data
			})

			const resultFromNextServer = await fetch('/api/auth', {
				method: 'POST',
				body: JSON.stringify(result.payload),
				headers: {
					'Content-Type': 'application/json',
				},
			}).then((res) => res.json())
			setLoading(false)
			loginForm.reset()
			setSessionToken(resultFromNextServer.data.token)

			toast({
				title: 'Success',
				description: result.payload.message,
			})
		} catch (err: any) {
			setLoading(false)
			const errors = err.payload.errors as {
				message: string
				field: string
			}[]

			const status = err.statusCode

			if (status === 422) {
				errors.forEach((error) => {
					loginForm.setError(error.field as 'email' | 'password', {
						message: error.message,
					})
				})
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: err.payload.message,
				})
			}
		}
	}
	return (
		<Form {...loginForm}>
			<form
				onSubmit={loginForm.handleSubmit(onSubmitLoginForm)}
				className='flex flex-col gap-4'
			>
				<FormField
					control={loginForm.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='Example: example@gmail.com'
									{...field}
									autoComplete='email'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={loginForm.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter strong password'
									type='password'
									autoComplete='new-password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='mt-3 w-full'>
					{loading ? (
						<span className='animate-spin'>
							<Loader2 />
						</span>
					) : (
						'Sign in'
					)}
				</Button>
			</form>
		</Form>
	)
}

export default LoginForm
