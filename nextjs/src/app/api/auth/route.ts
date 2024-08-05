export async function POST(request: Request) {
	const { data } = await request.json()

	const sessionToken = data.token

	if (!sessionToken) {
		return Response.json(
			{
				message: 'Invalid token',
			},
			{
				status: 400,
			},
		)
	}

	return Response.json(
		{ data },
		{
			status: 200,

			headers: {
				'Set-Cookie': `session=${sessionToken}; Path=/; HttpOnly; Secure;;   `,
			},
		},
	)
}
