"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { siteConfig } from "../../config/site";

export function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="w-10 px-10 sm:hidden">
                    <Menu className="h-5 w-5"/>
                    <span className="sr-only">Toggle Theme</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    {/* added to fix some error with sheet content that needed a title */}
                    <SheetTitle className="hidden">Navigation</SheetTitle>
                    <SheetDescription className="hidden">
                        Navigation menu for mobile devices
                    </SheetDescription>
                    <MobileLink onOpenChange={setOpen} href="/" className="flex items-center">
                        <Icons.logo className="mr-2 h-4 w-4" />
                        <span className="font-bold">{siteConfig.name}</span>
                    </MobileLink>
                </SheetHeader>
                <div className="flex flex-col gap-3 mt-2 px-4">
                    <MobileLink onOpenChange={setOpen} href="/blog">
                        Blog
                    </MobileLink>
                    <MobileLink onOpenChange={setOpen} href="/about">
                        About
                    </MobileLink>
                    <Link target="_blank" rel="noreferrer" href={siteConfig.links.github}>
                        <div className="flex items-center gap-2">
                            Github
                            <Icons.gitHub className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </div>
                    </Link>
                    <Link target="_blank" rel="noreferrer" href={siteConfig.links.linkedin}>
                        <div className="flex items-center gap-2">
                            LinkedIn
                            <Icons.linkedin className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </div>
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    )
}

interface MobileLinkProps extends Omit<LinkProps, "href"> {
    href: string;
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

function MobileLink({
    href,
    onOpenChange,
    children,
    className,
    ...props
}: MobileLinkProps) {
    const router = useRouter()
    return (
        <Link
            href={href}
            onClick={(e) => {
                e.preventDefault()
                router.push(href)
                onOpenChange?.(false)
            }}
            className={className}
            {...props}
        >
            {children}
        </Link>
    )
}