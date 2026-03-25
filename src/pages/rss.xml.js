import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const articles = await getCollection('articles', ({ data }) => !data.draft);
	articles.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: articles.map((article) => ({
			title: article.data.title,
			pubDate: article.data.date,
			description: article.data.excerpt,
			author: article.data.author,
			link: `/articles/${article.id.replace(/\.mdx?$/, '').toLowerCase()}/`,
		})),
	});
}
