import Link from "next/link"
import Image from "next/image"

import CustomButton from "./CustomButton"

const NavBar = () => (
    <header className="sticky top-0 z-10 w-full border-b bg-gradient-to-b from-background via-background/90 to-background/70 backdrop-blur">
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between bg-transparent px-6 py-4 sm:px-16">
            <Link href="/" className="flex items-center justify-center">
                <Image
                    src="/logo.svg"
                    alt="logo"
                    width={118}
                    height={18}
                    className="object-contain"
                />
            </Link>

            <CustomButton
                headTitle="Sign in"
                type="button"
                variant={"outline"}
                className="min-w-[130px] rounded-full bg-background/70 text-blue-700 hover:text-blue-700 hover:supports-[backdrop-filter]:bg-accent/70"
            />
        </nav>
    </header>
)

export default NavBar
