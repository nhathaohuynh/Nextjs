import envConfig from '@/config'

class HttpError extends Error {
	status: number
	payload: any

	constructor({ status, payload }: { status: number; payload: any }) {
		super()
		this.status = status
		this.payload = payload
	}
}

export class RequestHTTP {
	headers = {
		'Content-Type': 'application/json',
	}
	body: any
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'
	baseURL = envConfig.NEXT_PUBLIC_API_ENDPOINT
	options: RequestInit | undefined

	constructor() {
		this.headers = {
			'Content-Type': 'application/json',
		}
	}

	handleURL(url: string) {
		if (url.startsWith('/')) return this.baseURL + url
		return this.baseURL + '/' + url
	}

	async request<Response>() {
		const response = await fetch(this.baseURL, {
			headers: this.headers,
			body: this.body,
			method: this.method,
			...this.options,
		})

		const payload = await response.json()

		if (!response.ok) {
			throw new HttpError({
				status: response.status,
				payload,
			})
		}

		return payload as Response
	}

	async get<Response>(url: string, options?: RequestInit) {
		this.method = 'GET'
		this.baseURL = this.handleURL(url)
		this.options = options
		return this.request<Response>()
	}

	async post<Response, Request>(
		url: string,
		body: Request,
		options?: RequestInit,
	) {
		this.method = 'POST'
		this.baseURL = this.handleURL(url)
		this.body = JSON.stringify(body)
		this.options = options
		return this.request<Response>()
	}

	async put<Response, Request>(
		url: string,
		body: Request,
		options?: RequestInit,
	) {
		this.method = 'PUT'
		this.baseURL = this.handleURL(url)
		this.body = JSON.stringify(body)
		this.options = options
		return this.request<Response>()
	}

	async delete<Response>(url: string, options?: RequestInit) {
		this.method = 'DELETE'
		this.baseURL = this.handleURL(url)
		this.options = options
		return this.request<Response>()
	}
}
