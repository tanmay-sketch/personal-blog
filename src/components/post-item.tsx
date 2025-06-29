import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formateDate } from "@/lib/utils";

interface PostItemProps {
    slug: string;
    title: string;
    description?: string;
    date: string;
}

export function PostItem({slug, title, description, date} : PostItemProps) {
    return (
        <article className="flex flex-col gap-2 border-border border-b py-3">
            <div>
                <h2 className="text-2xl font-bold">
                    <Link href={slug}>
                        {title}
                    </Link>
                </h2>
                {/* <p className="text-sm text-muted-foreground">
                    {date}
                </p> */}
            </div>
            <div className="max-w-none text-muted-foreground">
                {description}
            </div>
            <div className="flex justify-between items-center">
                <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={date}>{formateDate(date)}</time>
                    </dd>
                </dl>
                <Link href={slug} className={cn(buttonVariants({variant: "link"}),"py-0")}>Read More</Link>
            </div>
        </article>
    )
}