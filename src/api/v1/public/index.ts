import {Client} from "@notionhq/client";

const auth = "secret_CgEo78nHg1qIiGRQgafTh6UDdmKKJimr6AlmZkJXzUF";
const notion = new Client({ auth });

const queryPageId = async (pageId: string) => {
  return await notion.pages.retrieve({ page_id: pageId });
};

const queryProjectAllDetail = async (databaseId: string) => {
  return await notion.databases.query({
    database_id: databaseId,
  });
};

const queryProjectAllDetailID = async (databaseId: string) => {
  return await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: "ID",
        direction: "ascending",
      },
    ],
  });
};

export {queryPageId,queryProjectAllDetail,queryProjectAllDetailID}
