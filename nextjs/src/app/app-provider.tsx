'use client'
import { createContext, useContext, useState } from 'react'

const AppContext = createContext({
	sessionToken: '',
	setSessionToken: (token: string) => {},
})

export const useAppContext = () => {
	const context = useContext(AppContext)

	if (!context) {
		throw new Error('useContext must be used within a AppProvider')
	}

	return context
}

export default function AppProvider({
	children,
	initialSessionToken = '',
}: {
	children: React.ReactNode
	initialSessionToken?: string
}) {
	const [sessionToken, setSessionToken] = useState(initialSessionToken)

	return (
		<AppContext.Provider value={{ sessionToken, setSessionToken }}>
			{children}
		</AppContext.Provider>
	)
}
