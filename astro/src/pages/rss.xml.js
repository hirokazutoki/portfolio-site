import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
    return rss({
        title: 'Hirokazu Toki',
        description: 'Hirokazu Toki\'s Articles',
        site: context.site,
        items: await pagesGlobToRssItems(import.meta.glob('./articles/*.md')),
        customData: `<language>ja-jp</language>`,
    });
}