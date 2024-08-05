'use client'

import { RegisterBody, RegisterBodyType } from '@/app/schemas/auth.schema'
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
import envConfig from '@/config'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const RegisterForm = () => {
	const formRegister = useForm<RegisterBodyType>({
		resolver: zodResolver(RegisterBody),
		defaultValues: {
			name: '',
			password: '',
			confirmPassword: '',
			email: '',
		},
	})

	const onSubmitRegisterForm = async (values: RegisterBodyType) => {
		console.log(values)
		const result = await fetch(
			`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
			{
				body: JSON.stringify(values),
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		).then((res) => res.json())

		console.log(result)
	}
	return (
		<Form {...formRegister}>
			<form
				onSubmit={formRegister.handleSubmit(onSubmitRegisterForm)}
				className='flex flex-col gap-4'
			>
				<FormField
					control={formRegister.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder='Example: huynh nhat hao'
									{...field}
									autoComplete='name'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={formRegister.control}
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
					control={formRegister.control}
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

				<FormField
					control={formRegister.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm password</FormLabel>
							<FormControl>
								<Input
									placeholder='Enter password again'
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
					Sign up
				</Button>
			</form>
		</Form>
	)
}

export default RegisterForm
