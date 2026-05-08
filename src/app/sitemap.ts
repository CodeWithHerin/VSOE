import { MetadataRoute } from 'next';

const locales = ['en', 'fr', 'it', 'de'];
const baseUrl = 'https://project-vitesse-one.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages = [
        '',
        '/book',
        '/destinations',
        '/experiences',
        '/suites',
        '/occasions',
        '/offers',
        '/membership',
        '/stories',
        '/login',
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    locales.forEach((lang) => {
        staticPages.forEach((page) => {
            sitemapEntries.push({
                url: `${baseUrl}/${lang}${page}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: page === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
