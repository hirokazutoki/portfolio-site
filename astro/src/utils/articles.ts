import type { PaginateFunction } from 'astro';
import { getRelativeLocaleUrl } from 'astro:i18n';

export function getArticlesPage(paginate: PaginateFunction, locale: string = 'ja') {
  const modules = import.meta.glob('../pages/articles/*.md', { eager: true });

  const allArticles = Object.entries(modules)
    .map(([path, mod]: [string, any]) => {
      const slug = path.split('/').pop()!.replace(/\.md$/, '');
      return { ...mod, url: getRelativeLocaleUrl(locale, `/articles/${slug}`) };
    })
    .sort((a: any, b: any) => new Date(b.frontmatter.pubDate).getTime() - new Date(a.frontmatter.pubDate).getTime());

  return paginate(allArticles, { pageSize: 4 });
}
