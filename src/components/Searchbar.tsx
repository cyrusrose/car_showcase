"use client"

import Image from "next/image"
import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import SearchManufacturer from "./SearchManufacturer"
import { updateSearchParams } from "@/lib/callback"

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type="submit" className={cn("z-10 -ml-3", otherClasses)}>
        <Image
            src={"/magnifying-glass.svg"}
            alt={"magnifying glass"}
            width={40}
            height={40}
            className="object-contain"
        />
    </button>
)

const SearchBar = () => {
    const [manufacturer, setManuFacturer] = useState("")
    const modelRef = useRef<HTMLInputElement | null>(null)

    const router = useRouter()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const model = modelRef.current?.value.trim().toLowerCase() || undefined
        let _manufacturer = manufacturer.trim().toLowerCase() || undefined
        if (_manufacturer === "all") _manufacturer = undefined

        const newPathname = updateSearchParams(
            {
                model,
                manufacturer: _manufacturer
            },
            "#search"
        )

        router.push(newPathname)
    }

    return (
        <form className="searchbar" onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer
                    manufacturer={manufacturer}
                    setManuFacturer={setManuFacturer}
                />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <div className="searchbar__item">
                <Image
                    src="/model-icon.png"
                    width={25}
                    height={25}
                    className="absolute ml-4 h-[20px] w-[20px]"
                    alt="car model"
                />
                <input
                    type="text"
                    name="model"
                    ref={modelRef}
                    placeholder="Tiguan..."
                    className="searchbar__input"
                />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden" />
        </form>
    )
}

export default SearchBar
