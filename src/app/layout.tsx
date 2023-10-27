import Footer from "@/components/Footer"
import "./globals.css"
import type { Metadata } from "next"
import NavBar from "@/components/Navbar"

export const metadata: Metadata = {
    title: "Car Hub",
    description: "Discover world's best car showcase application"
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                {children}
                <Footer />
            </body>
        </html>
    )
}
