"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {

    // Mount the provider only after the component has mounted to avoid hydration issues with Next.js.
    // This is necessary because Next.js renders on the server and we want to avoid hydration issues

    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;


    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}