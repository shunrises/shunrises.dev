import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { parse } from "date-fns";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context: { site: any }) {
  const items = (await getCollection("blog"))
    .filter((item) => !item.data.draft)
    .sort((a, b) => {
      const aDate = parse(a.data.date, "dd-MM-yyyy", new Date());
      const bDate = parse(b.data.date, "dd-MM-yyyy", new Date());
      return bDate.getTime() - aDate.getTime();
    });

  return rss({
    trailingSlash: false,
    title: "shunrises.dev",
    description: "공부한 내용, 개발 과정에서의 고민, 프로젝트 경험을 기록하며 기술과 좋아하는 문화를 연결하는 공간입니다.",
    site: context.site,
    items: items.map((item) => ({
      link: `/blog/${item.id}`,
      pubDate: parse(item.data.date, "dd-MM-yyyy", new Date()),
      title: item.data.title,
      description: item.data.description,
      categories: [item.data.category, ...(item.data.tags || [])].filter(Boolean),
      tag: item.data.tags,
      author: item.data.author,
      content: sanitizeHtml(parser.render(item.body ?? ""), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
    customData: `<language>ko</language>`,
  });
}
