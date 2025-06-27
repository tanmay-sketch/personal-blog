import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteConfig } from "../../../../config/site";

interface PostPageProps {
    params: {
        slug: string[];
    };
}

async function getPostFromParams(params: PostPageProps["params"]) {
    const slug = (await params)?.slug?.join("/");
    return posts.find((post) => post.slugAsParams === slug);
}

export async function generateMetadata({params}: PostPageProps) : Promise<Metadata> {
    const post = await getPostFromParams(params);
    if (!post) {
        return {};
    }

    const ogSearchParams = new URLSearchParams();
    ogSearchParams.set("title", post.title);

    const ogImage = `/api/og?${ogSearchParams.toString()}`;

    return {
        title: post.title,
        description: post.description,
        authors: { name: siteConfig.author },
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            url: `${siteConfig.url}${post.slug}`,
            images: [{
                url: ogImage,
                width: 1200,
                height: 630,
                alt: post.title
            }],
            siteName: siteConfig.name,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [ogImage],
            creator: siteConfig.social.twitter,
            site: siteConfig.social.twitter
        },
        alternates: {
            canonical: `${siteConfig.url}${post.slug}`
        }
    }
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
    return posts.map((post) => ({
        slug: post.slugAsParams.split("/"),
    }))
}

export default async function PostPage({params}: PostPageProps) {
    const post = await getPostFromParams(params);
    if (!post || !post.published) {
        notFound();
    }

    return (
        <article className="container px-4 py-6 prose dark:prose-invert max-w-3xl mx-auto">
            <h1 className="mb-2">
                {post.title}
            </h1>
            {post.description ? (<p className="text-xl mt-0 text-muted-foreground">{post.description}</p>) : null}
            <hr className="my-4" />
            <div className="mdx-scope">
                <MDXContent code={post.body}/>
            </div>
        </article>
    );
}