"use client"

import Image from "next/image"
import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import SearchManufacturer from "./SearchManufacturer"

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
    const model = useRef("")

    console.log(manufacturer)

    const router = useRouter()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (manufacturer.trim() === "" && model.current.trim() === "") {
            return alert("Please provide some input")
        }

        updateSearchParams(model.current.toLowerCase(), manufacturer)
    }

    const updateSearchParams = (model: string, manufacturer: string) => {
        // Create a new URLSearchParams object using the current URL search parameters
        const searchParams = new URLSearchParams(window.location.search)

        // Update or delete the 'model' search parameter based on the 'model' value
        if (model) {
            searchParams.set("model", model)
        } else {
            searchParams.delete("model")
        }

        // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
        if (manufacturer) {
            searchParams.set("manufacturer", manufacturer)
        } else {
            searchParams.delete("manufacturer")
        }

        // Generate the new pathname with the updated search parameters
        const newPathname = `${
            window.location.pathname
        }?${searchParams.toString()}`

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
                    value={model.current}
                    onChange={(e) => {
                        model.current = e.target.value
                    }}
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
