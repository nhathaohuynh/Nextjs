'use client'

import LoginForm from './login-form'

const Login = () => {
	return (
		<section className='w-[400px] shadow-md border mt-20 p-12 mx-auto rounded-md'>
			<h1 className='text-3xl mb-8'>Login Account</h1>
			<div>
				<LoginForm />
			</div>
		</section>
	)
}

export default Login
