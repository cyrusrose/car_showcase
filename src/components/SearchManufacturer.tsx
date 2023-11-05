import Image from "next/image"
import { Fragment, useState } from "react"
import { Combobox, Transition } from "@headlessui/react"

import { manufacturers } from "@/constants"
import { SearchManuFacturerProps } from "@/types"
import { cn } from "@/lib/utils"

const SearchManufacturer = ({
    manufacturer,
    setManuFacturer
}: SearchManuFacturerProps) => {
    const [query, setQuery] = useState("")

    const filteredManufacturers =
        query === ""
            ? manufacturers
            : manufacturers.filter((item) =>
                  item
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              )

    return (
        <div className="search-manufacturer">
            <Combobox value={manufacturer} onChange={setManuFacturer}>
                <div className="relative w-full">
                    {/* Button for the combobox. Click on the icon to see the complete dropdown */}
                    <Combobox.Button className="absolute top-[14px]">
                        <Image
                            src="/car-logo.svg"
                            width={20}
                            height={20}
                            className="ml-4"
                            alt="car logo"
                        />
                    </Combobox.Button>

                    {/* Input field for searching */}
                    <Combobox.Input
                        className="search-manufacturer__input"
                        displayValue={(item: string) => item}
                        onChange={(event) => setQuery(event.target.value)} // Update the search query when the input changes
                        placeholder="Volkswagen..."
                    />

                    {/* Transition for displaying the options */}
                    <Transition
                        as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")} // Reset the search query after the transition completes
                    >
                        <Combobox.Options
                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            static>
                            {filteredManufacturers.length === 0 &&
                            query !== "" ? (
                                <Combobox.Option
                                    value={query}
                                    className="search-manufacturer__option">
                                    Create &quot;{query}&quot;
                                </Combobox.Option>
                            ) : (
                                filteredManufacturers.map((item) => (
                                    <Combobox.Option
                                        key={item}
                                        className={({ active }) =>
                                            cn(
                                                "search-manufacturer__option relative text-gray-900",
                                                {
                                                    active: "bg-primary text-white"
                                                }
                                            )
                                        }
                                        value={item}>
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={cn(
                                                        "block truncate font-normal",
                                                        {
                                                            selected:
                                                                "font-medium"
                                                        }
                                                    )}>
                                                    {item}
                                                </span>

                                                {/* Show an active blue background color if the option is selected */}
                                                {selected ? (
                                                    <span
                                                        className={cn(
                                                            "absolute inset-y-0 left-0 flex items-center bg-primary pl-3 text-primary-foreground",
                                                            {
                                                                active: "text-white"
                                                            }
                                                        )}></span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchManufacturer