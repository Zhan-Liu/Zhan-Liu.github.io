import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "@config";
import { getCollection } from "astro:content";

export async function GET(context: any) {
  // 获取 "blog" 内容集合
  const blogPosts = await getCollection("blog");
  // 为 blog 文章添加一个标识，方便后续处理链接
  const formattedBlogPosts = blogPosts.map((post) => ({
    ...post,
    collection: "blog", // 添加一个 'collection' 属性来标识来源
  }));

  // 获取 "memory" 内容集合
  const memoryEntries = await getCollection("memory");
  // 为 memory 文章添加一个标识
  const formattedMemoryEntries = memoryEntries.map((entry) => ({
    ...entry,
    collection: "memory", // 添加一个 'collection' 属性来标识来源
  }));

  // 合并两个集合的文章
  const allContent = [...formattedBlogPosts, ...formattedMemoryEntries];

  // 按照发布日期进行排序
  const sortedContent = allContent.sort(
    (a: any, b: any) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: sortedContent.map((item: any) => ({
      ...item.data,
      // 根据 content collection 的来源动态生成链接
      link: `/${item.collection}/${item.slug}/`, // 这里根据 item.collection 属性来判断是 'blog' 还是 'memory'
    })),
  });
}