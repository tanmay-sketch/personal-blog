import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { sortPosts } from "@/lib/utils";

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function BlogPage( { searchParams }: BlogPageProps ) {
    const params = await searchParams;
    const currentPage = Number(params?.page) || 1;
    const sortedPosts = sortPosts(posts.filter((post) => post.published));
    const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

    const displayPosts = sortedPosts.slice(
        POSTS_PER_PAGE * (currentPage - 1),
        POSTS_PER_PAGE * currentPage
    );

    return (
        <section className="py-6 lg:py-10">
            <div className="container flex h-full max-w-screen-2xl items-center justify-center">
                <div className="flex max-w-4xl w-full flex-col space-y-4 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-start gap-2 md:flex-row md:justify-between md:gap-8">
                        <div className="flex-1 space-y-2">
                            <h1 className="inline-block font-bold text-4xl lg:text-5xl">
                                Blog
                            </h1>
                            <p className="text-xl text-muted-foreground">
                                Data Science, Machine Learning, and AI
                            </p>
                        </div>
                    </div>
                    <hr className="mt-4" />
                    {displayPosts?.length > 0 ? (
                        <ul className="flex flex-col">
                            {displayPosts.map(post => {
                                const {slug, date, title, description} = post;
                                return <li key={slug}>
                                    <PostItem slug={slug} title={title} description={description} date={date} />
                                </li>
                            })}
                        </ul>
                    ) : <p>Nothing to see here yet</p>}
                    <QueryPagination totalPages={totalPages} className="justify-end mt-4"/>
                </div>
            </div>
        </section>
    )
}