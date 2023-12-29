"use client"

import { Fragment, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Listbox, Transition } from "@headlessui/react"

import { CustomFilterProps } from "@/types"
import { updateSearchParams } from "@/lib/callback"
import { cn } from "@/lib/utils"

export default function CustomFilter({ title, options }: CustomFilterProps) {
    const router = useRouter()
    const [selected, setSelected] = useState(options[0]) // State for storing the selected option

    // update the URL search parameters and navigate to the new URL
    const handleUpdateParams = (e: { title: string; value: string }) => {
        const newPathName = updateSearchParams({
            [title]: e.value.toLowerCase()
        })

        router.push(newPathName)
    }

    return (
        <div className="w-fit">
            <Listbox
                value={selected}
                onChange={(e) => {
                    setSelected(e) // Update the selected option in state
                    handleUpdateParams(e) // Update the URL search parameters and navigate to the new URL
                }}>
                <div className="relative z-10 w-fit">
                    {/* Button for the listbox */}
                    <Listbox.Button className="custom-filter__btn">
                        <span className="block truncate">{selected.title}</span>
                        <Image
                            src="/chevron-up-down.svg"
                            width={20}
                            height={20}
                            className="ml-4 object-contain"
                            alt="chevron_up-down"
                        />
                    </Listbox.Button>
                    {/* Transition for displaying the options */}
                    <Transition
                        as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Listbox.Options className="custom-filter__options">
                            {/* Map over the options and display them as listbox options */}
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.title}
                                    className={({ active }) =>
                                        cn({
                                            "relative cursor-default select-none px-4 py-2 text-gray-900":
                                                true,
                                            "bg-primary-blue text-white": active
                                        })
                                    }
                                    value={option}>
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={cn({
                                                    "block truncate font-normal":
                                                        true,
                                                    "font-bold": selected
                                                })}>
                                                {option.title}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
