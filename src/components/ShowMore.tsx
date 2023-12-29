"use client"

import { useRouter } from "next/navigation"
import { ShowMoreProps } from "@/types"
import { updateSearchParams } from "@/lib/callback"
import CustomButton from "@/components/CustomButton"
import { PAGE_COUNT } from "@/constants"

const ShowMore = ({ pageNumber, hasNext }: ShowMoreProps) => {
    const router = useRouter()

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * PAGE_COUNT

        const newPathname = updateSearchParams(
            { first: newLimit.toString() },
            "#search"
        )
        router.push(newPathname)
    }

    return (
        <div className="flex-center mt-10 w-full gap-5">
            <CustomButton
                disabled={!hasNext}
                type="button"
                headTitle="Show More"
                className="rounded-full bg-primary text-white"
                handleClick={handleNavigation}
            />
        </div>
    )
}

export default ShowMore
