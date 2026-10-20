"use client"
import { AppProvider } from '@/context/context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

const Provider = ({
    children
}: {
    children: ReactNode
}) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                retry: 1,
                staleTime: 1000 * 60 * 5,
            },
        }
    }))

    return (
        <QueryClientProvider client={queryClient}>
            <AppProvider>
                {children}
            </AppProvider>
        </QueryClientProvider>
    )
}

export default Provider