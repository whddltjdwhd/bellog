import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

import { Post } from "@/types";
import {
  PageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

/**
 * Next.js의 fetch에 사용되는 RequestInit의 확장 타입입니다.
 * 'next' 객체를 포함하여 캐싱 및 재검증 옵션을 지정할 수 있습니다.
 */
type NextFetchRequestInit = RequestInit & {
  next?: {
    [key: string]: unknown; // tags, revalidate 등을 포함할 수 있도록 유연하게 설정
  };
};

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  fetch: (url, options) => {
    return fetch(url, {
      ...options,
      next: {
        // 'any' 대신 정의한 타입을 사용하여 'options'의 타입을 구체화합니다.
        ...((options as NextFetchRequestInit)?.next || {}),
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

  // response.results는 (PageObjectResponse | PartialPageObjectResponse)[] 타입입니다.
  // 필터링을 통해 PageObjectResponse만 남깁니다.
  const pages = response.results.filter(
    (page): page is PageObjectResponse => "properties" in page
  );

  const posts = pages.map((page) => {
    // 이제 page는 PageObjectResponse 타입으로 안전하게 추론됩니다.
    const { properties } = page;

    // 각 속성의 타입을 명확히 하기 위해 구조 분해 할당과 타입 단언을 사용합니다.
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

    // description 이나 slug가 비어있을 경우를 대비한 방어 코드
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

export const getPostContent = async (pageId: string) => {
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdStringObject = n2m.toMarkdownString(mdblocks);
  const mdString = mdStringObject.parent;

  return {
    content: mdString,
  };
};
