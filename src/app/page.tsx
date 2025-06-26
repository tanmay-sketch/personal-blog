import { buttonVariants } from "@/components/ui/button";
import { cn, sortPosts } from "@/lib/utils";
import Link from "next/link";
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";

export default function Home() {
  const latestPosts = sortPosts(posts.filter((post) => post.published)).slice(0, 5);
  return (
    <>
      <section className="min-h-[100vh] flex items-center justify-center">
        <div className="container flex h-full max-w-screen-2xl items-center justify-center">
          <div className="flex max-w-[64rem] flex-col items-center gap-4 text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-bold text-balance">
              Welcome to my blog!
            </h1>
            <p className="max-w-[42rem] text-muted-foreground sm:text-xl text-balance">
              I&apos;m Tanmay, I like to write about data science, sports, and other random stuff.
            </p>
            <div className="flex flex-col gap-4 justify-center sm:flex-row">
              <Link href="/blog" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}>
                Read Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-16">
        <div className="container flex h-full max-w-screen-2xl items-center justify-center">
          <div className="flex max-w-4xl w-full flex-col space-y-6 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center">Latest Posts</h2>
            <ul className="flex flex-col">
              {latestPosts.map(post => (<li key={post.slug} className="first:border-t first:border-border">
                <PostItem 
                  slug={post.slug} 
                  title={post.title} 
                  description={post.description}
                  date={post.date} 
                />
              </li>))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
