import { MouseEventHandler } from "react"

import { CarsQuery } from "@/generated/graphql"

export type CarEdge = CarsQuery["feed"]["edges"] extends
    | (infer U)[]
    | null
    | undefined
    ? U
    : never

export type Car = CarEdge["node"]

// export interface CarProps {
//     city_mpg: number
//     class: string
//     combination_mpg: number
//     cylinders?: number | null
//     displacement?: number | null
//     drive: string
//     fuel_type: string
//     highway_mpg: number
//     make: string
//     model: string
//     transmission: string
//     year: number
// }

export interface FilterProps {
    manufacturer?: string
    year?: number
    model?: string
    first?: number
    fuel?: string
    after?: string
}

export interface HomeProps {
    searchParams: {
        manufacturer?: string
        year?: string
        model?: string
        first?: string
        fuel?: string
        after?: string
    }
}

export interface CarCardProps {
    model: string
    make: string
    mpg: number
    transmission: string
    year: number
    drive: string
    cityMPG: number
}

export interface CustomButtonProps {
    // isDisabled?: boolean
    // btnType?: "button" | "submit"
    // containerStyles?: string
    textStyles?: string
    headTitle: string
    rightIcon?: string
    handleClick?: MouseEventHandler<HTMLButtonElement>
}

export interface OptionProps {
    title: string
    value: string
}

export interface CustomFilterProps {
    title: string
    options: OptionProps[]
}

export interface ShowMoreProps {
    pageNumber: number
    hasNext: boolean
}

export interface SearchManuFacturerProps {
    manufacturer: string
    setManuFacturer: (manufacturer: string) => void
}
