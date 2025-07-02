'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AppLayout } from '@/components/layout/AppLayout'
import '@/utils/styles/globals.css'

import { Web3Provider } from './provider'

const client = new QueryClient()

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<html lang='en'>
			<head>
				<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' />
				<title>sbt test</title>
			</head>
			<body className='antialiased'>
				<QueryClientProvider client={client}>
					<Web3Provider>
						<AppLayout>{children}</AppLayout>
						<ToastContainer
							position='top-center'
							autoClose={3000}
							hideProgressBar={false}
							newestOnTop
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme='colored'
						/>
					</Web3Provider>
				</QueryClientProvider>
			</body>
		</html>
	)
}

export default RootLayout
