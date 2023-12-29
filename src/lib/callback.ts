import { Car } from "@/types"

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50 // Base rental price per day in dollars
    const mileageFactor = 0.1 // Additional rate per mile driven
    const ageFactor = 0.05 // Additional rate per year of vehicle age

    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor
    const ageRate = (new Date().getFullYear() - year) * ageFactor

    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

    return rentalRatePerDay.toFixed(0)
}

export const updateSearchParams = (
    options: {
        [type: string]: string | undefined
    },
    hash: string = window.location.hash
) => {
    // Get the current URL search params
    const searchParams = new URLSearchParams(window.location.search)

    for (const key in options) {
        const value = options[key]

        if (value) searchParams.set(key, value)
        else searchParams.delete(key)
    }

    // Set the specified search parameter to the given value
    const newPathname = `${
        window.location.pathname
    }?${searchParams.toString()}${hash}`

    return newPathname
}

export const deleteSearchParams = (
    type: string,
    hash: string = window.location.hash
) => {
    // Set the specified search parameter to the given value
    const newSearchParams = new URLSearchParams(window.location.search)

    // Delete the specified search parameter
    newSearchParams.delete(type.toLocaleLowerCase())

    // Construct the updated URL pathname with the deleted search parameter
    const newPathname = `${
        window.location.pathname
    }?${newSearchParams.toString()}${hash}`

    return newPathname
}
