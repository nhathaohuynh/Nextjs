import React from 'react'
import RegisterForm from './register-form'

const Register = () => {
	return (
		<section className=' p-16 rounded-md shadow-sm mt-10 border'>
			<h1 className='text-3xl mb-8'>Register Account</h1>

			<div className=''>
				<RegisterForm />
			</div>
		</section>
	)
}

export default Register
