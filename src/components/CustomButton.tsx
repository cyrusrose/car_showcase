"use client"

import Image from "next/image"

import { CustomButtonProps } from "@/types"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MergedButtonProps extends CustomButtonProps, ButtonProps {}

const CustomButton = ({
    rightIcon,
    headTitle,
    className,
    handleClick,
    textStyles,
    type,
    ...props
}: MergedButtonProps) => (
    <Button
        type={type || "button"}
        className={cn("custom-btn", className)}
        onClick={handleClick}
        {...props}>
        <span className={cn("flex-1", textStyles)}>{headTitle}</span>
        {rightIcon && (
            <div className="relative h-6 w-6">
                <Image
                    src={rightIcon}
                    alt="arrow_left"
                    fill
                    className="object-contain"
                />
            </div>
        )}
    </Button>
)

export default CustomButton
