import { Callout } from "@/components/callout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BriefcaseBusiness, User } from "lucide-react";
import { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
    title: "About Me",
    description: "Information about me",
};

export default async function AboutPage() {
    return (
        <section className="py-12 lg:py-16">
            <div className="container flex h-full max-w-screen-2xl items-center justify-center mx-auto">
                <div className="flex max-w-4xl w-full flex-col space-y-6 px-4 sm:px-6 lg:px-8">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src="/profilepic.jpg" alt="Tanmay Grandhisiri" />
                        <AvatarFallback>
                            <User className="w-4 h-4" />
                            TG
                        </AvatarFallback>
                    </Avatar>
                    <h1 className="text-3xl sm:text-4xl font-bold">
                        About Me
                    </h1>
                    <div className="prose dark:prose-invert max-w-none">
                        <p>
                            Hi, I&apos;m Tanmay! I&apos;m passionate about data science, machine learning, and sharing knowledge through writing.
                            This is a casual blog where I share my projects, thoughts about various topics in tech and sports along with anything that excites me.

                        </p>
                        <Callout>
                            <div className="flex items-center gap-2">
                                <BriefcaseBusiness className="w-4 h-4" />
                                <Link href="https://www.tanmaygrandhisiri.com" target="_blank" className="hover:underline hover:text-blue-300 transition-colors duration-300">
                                    Check out my portfolio at tanmaygrandhisiri.com
                                </Link>
                            </div>
                        </Callout>
                    </div>
                </div>
            </div>
        </section>
    )
}