import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

import { Post } from "@/types";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  fetch: (url, options) => {
    return fetch(url, {
      ...options,
      next: {
        ...((options as any)?.next || {}),
        tags: ["posts"],
      },
    });
  },
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPostsFromNotion = async (): Promise<Post[]> => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("NOTION_DATABASE_ID is not defined");
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "status",
      select: {
        equals: "published",
      },
    },
    sorts: [
      {
        property: "date",
        direction: "descending",
      },
    ],
  });

  const posts = response.results.map((page: any) => {
    const { properties } = page;
    const { title, date, description, slug, tags } = properties;

    return {
      id: page.id,
      title: title.title[0].plain_text,
      date: date.date.start,
      description: description.rich_text[0].plain_text,
      slug: slug.rich_text[0].plain_text,
      tags: tags.multi_select.map((tag: any) => tag.name),
      status: properties.status.select.name,
    };
  });

  return posts;
};

export const getPostContent = async (pageId: string) => {
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdStringObject = n2m.toMarkdownString(mdblocks);
  const mdString = mdStringObject.parent;

  return {
    content: mdString,
  };
};
