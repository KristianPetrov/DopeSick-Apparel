import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dopesick.apparel";

export default function sitemap (): MetadataRoute.Sitemap
{
    const lastModified = new Date();
    return [
        {
            url: `${siteUrl}/`,
            lastModified,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${siteUrl}/store`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];
}



