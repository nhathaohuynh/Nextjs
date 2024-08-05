import React from 'react'
import RegisterForm from './register-form'

const Register = () => {
	return (
		<section className='w-[400px] shadow-md border mt-10 p-12 mx-auto rounded-md'>
			<h1 className='text-3xl mb-8'>Register Account</h1>

			<div className=''>
				<RegisterForm />
			</div>
		</section>
	)
}

export default Register
