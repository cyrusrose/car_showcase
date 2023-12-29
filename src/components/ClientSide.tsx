"use client"

import { useEffect } from "react"

const ClientSide = ({ children = <></> }: { children?: React.ReactNode }) => {
    useEffect(() => {
        // Check if URL contains a hash (#) and scroll to the target element
        if (window.location.hash) {
            const element = document.querySelector(window.location.hash)
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            }
        }
    }, [])

    return <>{children}</>
}

export default ClientSide
