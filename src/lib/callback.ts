"use client"

import { CarProps, FilterProps } from "@/types"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

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

export const updateSearchParams = (type: string, value: string) => {
    // Get the current URL search params
    const searchParams = new URLSearchParams(window.location.search)

    // Set the specified search parameter to the given value
    searchParams.set(type, value)

    // Set the specified search parameter to the given value
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    return newPathname
}

export const deleteSearchParams = (type: string) => {
    // Set the specified search parameter to the given value
    const newSearchParams = new URLSearchParams(window.location.search)

    // Delete the specified search parameter
    newSearchParams.delete(type.toLocaleLowerCase())

    // Construct the updated URL pathname with the deleted search parameter
    const newPathname = `${
        window.location.pathname
    }?${newSearchParams.toString()}`

    return newPathname
}

export function useCars(filters: FilterProps) {
    const props = useMemo(
        () => ({
            manufacturer: filters.manufacturer,
            year: filters.year,
            model: filters.model,
            limit: filters.limit,
            fuel: filters.fuel
        }),
        [
            filters.manufacturer,
            filters.year,
            filters.model,
            filters.limit,
            filters.fuel
        ]
    )
    const [result, setResult] = useState<any[]>([])
    const controller = useRef(new AbortController())

    const fetchData = useCallback(async () => {
        const headers: HeadersInit = {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
            "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com"
        }

        try {
            const response = await fetch(
                `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${props.manufacturer}&year=${props.year}&model=${props.model}&limit=${props.limit}&fuel_type=${props.fuel}`,
                {
                    headers,
                    signal: controller.current.signal
                }
            )
            const result = await response.json()
            setResult(result)
        } catch (err) {
            if (err == "AbortError") console.log("cancelled")
        }
    }, [props])

    useEffect(() => {
        fetchData()

        return () => {
            controller.current.abort()
        }
    }, [fetchData])

    return result
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage")
    const { make, model, year } = car

    url.searchParams.append(
        "customer",
        process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ""
    )
    url.searchParams.append("make", make)
    url.searchParams.append("modelFamily", model.split(" ")[0])
    url.searchParams.append("zoomType", "fullscreen")
    url.searchParams.append("modelYear", `${year}`)
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append("angle", `${angle}`)

    return `${url}`
}
