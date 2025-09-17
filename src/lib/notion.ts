import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import { Post } from "@/types";
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const notionX = new NotionAPI({
  activeUser: process.env.NOTION_ACTIVE_USER,
  authToken: process.env.NOTION_TOKEN_V2,
  kyOptions: {
    mode: "cors",
  },
});

export const getAllPostsFromNotion = async (): Promise<Post[]> => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("NOTION_DATABASE_ID is not defined");
  }

  const response: QueryDatabaseResponse = await notion.databases.query({
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

  const pages = response.results.filter(
    (page): page is PageObjectResponse => "properties" in page
  );

  const posts = pages.map((page) => {
    const { properties } = page;

    const title = properties.title as {
      type: "title";
      title: { plain_text: string }[];
    };
    const date = properties.date as { type: "date"; date: { start: string } };
    const description = properties.description as {
      type: "rich_text";
      rich_text: { plain_text: string }[];
    };
    const slug = properties.slug as {
      type: "rich_text";
      rich_text: { plain_text: string }[];
    };
    const tags = properties.tags as {
      type: "multi_select";
      multi_select: { name: string }[];
    };
    const status = properties.status as {
      type: "select";
      select: { name: string };
    };

    const descriptionText = description.rich_text[0]?.plain_text ?? "";
    const slugText = slug.rich_text[0]?.plain_text ?? "";

    return {
      id: page.id,
      title: title.title[0].plain_text,
      date: date.date.start,
      description: descriptionText,
      slug: slugText,
      tags: tags.multi_select.map((tag) => tag.name),
      status: status.select.name,
    } as Post;
  });

  return posts;
};

export const getPostRecordMap = async (pageId: string) => {
  const recordMap = await notionX.getPage(pageId);
  return recordMap;
};

export const getPostBySlugFromNotion = async (
  slug: string
): Promise<Post | null> => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error("NOTION_DATABASE_ID is not defined");
  }

  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  if (response.results.length === 0) {
    return null;
  }

  const page = response.results[0];
  if (!("properties" in page)) {
    return null;
  }

  const { properties } = page as PageObjectResponse;

  const title = properties.title as {
    type: "title";
    title: { plain_text: string }[];
  };
  const date = properties.date as { type: "date"; date: { start: string } };
  const description = properties.description as {
    type: "rich_text";
    rich_text: { plain_text: string }[];
  };
  const tags = properties.tags as {
    type: "multi_select";
    multi_select: { name: string }[];
  };
  const status = properties.status as {
    type: "select";
    select: { name: string };
  };

  const descriptionText = description.rich_text[0]?.plain_text ?? "";
  const slugText = slug;

  return {
    id: page.id,
    title: title.title[0].plain_text,
    date: date.date.start,
    description: descriptionText,
    slug: slugText,
    tags: tags.multi_select.map((tag) => tag.name),
    status: status.select.name,
  } as Post;
};
