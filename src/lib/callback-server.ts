import { FilterProps } from "@/types"
import { getClient } from "./apollo-client"
import { gql as g } from "@/generated/gql"
import { PAGE_COUNT } from "@/constants"
import cookie from "cookie"

const GET_CARS = g(/* GraphQL */ `
    query Cars(
        $first: Int!
        $make: String
        $model: String
        $fuel: String
        $year: Int
        $after: ID
    ) {
        feed(
            first: $first
            make: $make
            model: $model
            fuel: $fuel
            year: $year
            after: $after
        ) {
            totalCount
            makeCount {
                make
                count
            }
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                cursor
                node {
                    city_mpg
                    class
                    combination_mpg
                    cylinders
                    displacement
                    drive
                    fuel_type
                    highway_mpg
                    id
                    make
                    model
                    transmission
                    year
                }
            }
        }
    }
`)

export async function login() {
    return fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        })
    })
}

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, model, first, fuel, after } = filters

    const client = getClient()
    const resp = (await login()).headers.get("set-cookie")!

    const Authentication = cookie.parse(resp)["Authentication"]

    console.log(Authentication)

    const cars = await client.query({
        query: GET_CARS,
        variables: {
            first: first || PAGE_COUNT,
            make: manufacturer || undefined,
            year: year || undefined,
            model: model || undefined,
            fuel: fuel || undefined,
            after: after || undefined
        },
        fetchPolicy: "no-cache",
        context: {
            fetchOptions: {
                next: { revalidate: 0 }
            },
            headers: {
                Authentication: Authentication
            }
        }
    })

    return cars
}
