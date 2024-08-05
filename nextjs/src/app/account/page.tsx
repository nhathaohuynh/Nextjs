import Header from '@/components/ui/header'
import envConfig from '@/config'
import { cookies } from 'next/headers'

export default async function page() {
	const cookieStores = cookies()

	try {
		const result = await fetch(
			`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${cookieStores.get('session')?.value!}`,
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

		console.log(result)
	} catch (err) {
		console.log('err', err)
	}
	return (
		<div>
			<Header />
		</div>
	)
}
