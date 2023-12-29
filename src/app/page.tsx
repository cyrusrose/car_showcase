import CarCard from "@/components/CarCard"
import CustomFilter from "@/components/CustomFilter"
import Hero from "@/components/Hero"
import SearchBar from "@/components/Searchbar"
import ShowMore from "@/components/ShowMore"
import { PAGE_COUNT, fuels, yearsOfProduction } from "@/constants"
import { fetchCars } from "@/lib/callback-server"
import { HomeProps } from "@/types"

export default async function Home({ searchParams }: HomeProps) {
    const { data, error, loading } = await fetchCars({
        manufacturer: searchParams.manufacturer,
        year: isNaN(Number(searchParams.year))
            ? undefined
            : Number(searchParams.year),
        fuel: searchParams.fuel,
        first: isNaN(Number(searchParams.first))
            ? PAGE_COUNT
            : Number(searchParams.first),
        model: searchParams.model
    })

    const pageInfo = data.feed.pageInfo
    const isDataEmpty = data.feed.totalCount === 0

    return (
        <main className="overflow-hidden">
            <Hero />

            <div className="padding-x padding-y max-width mt-12" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
                    <p>Explore out cars you might like</p>
                </div>

                <div className="home__filters" id="search">
                    <SearchBar />

                    <div className="home__filter-container">
                        <CustomFilter title="fuel" options={fuels} />
                        <CustomFilter
                            title="year"
                            options={yearsOfProduction}
                        />
                    </div>
                </div>

                <div id="content">
                    {error || isDataEmpty ? (
                        <div className="home__error-container">
                            <h2 className="text-xl font-bold text-black">
                                Oops, no results
                            </h2>
                            <p>{error?.message}</p>
                        </div>
                    ) : (
                        <section>
                            <div className="home__cars-wrapper">
                                {data.feed.edges?.map(({ cursor, node }) => (
                                    <CarCard key={cursor} car={node} />
                                ))}
                            </div>

                            <ShowMore
                                pageNumber={
                                    isNaN(Number(searchParams.first))
                                        ? 1
                                        : Number(searchParams.first) /
                                          PAGE_COUNT
                                }
                                hasNext={pageInfo.hasNextPage}
                            />
                        </section>
                    )}
                </div>
            </div>
        </main>
    )
}
