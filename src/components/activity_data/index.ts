import {queryPageId} from "../../api/v1/public";
import { GetPageResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// 定义一个更通用的属性类型
type PropertyValue = {
  type: string;
  [key: string]: any;
};

// 更新 ActivityProperty 接口
interface ActivityProperty {
  [key: string]: PropertyValue;
}

// 更新 ActivityProperties 接口
interface ActivityProperties {
  [key: string]: ActivityProperty;
}

// 更新 PageResponse 接口
interface PageResponse {
  properties: ActivityProperties;
  [key: string]: any;
}

// 定义一个更具体的 NotionPageResponse 类型
type NotionPageResponse = GetPageResponse | PageObjectResponse;

// 定义一个类型守卫函数
function isPageObjectResponse(response: NotionPageResponse): response is PageObjectResponse {
  return 'properties' in response;
}

// 更新 processData 函数
const processData = async <T>(pageIds: any[], processor: (data: PageObjectResponse['properties']) => T): Promise<T[]> => {
  const results = [];
  for (const pageId of pageIds) {
    const response = await queryPageId(typeof pageId === 'object' ? pageId.id : pageId) as NotionPageResponse;
    if (isPageObjectResponse(response)) {
      results.push(processor(response.properties));
    } else {
      console.error('Response does not contain properties:', response);
    }
  }
  return results;
};

// 更新 extractProperty 函数
const extractProperty = (property: any, key: string) => {
  if (!property || typeof property !== 'object') {
    return null;
  }

  if (!('type' in property)) {
    return null;
  }

  switch (property.type) {
    case 'title':
    case 'rich_text':
      return property[key]?.[0]?.plain_text || null;
    case 'number':
      return property[key] || null;
    case 'select':
      return property[key]?.name || null;
    case 'status':
      return property[key]?.name || null;
    case 'multi_select':
      return property[key]?.map((item: any) => item.name) || [];
    case 'date':
      return property[key]?.start || null;
    case 'files':
      return property[key]?.[0]?.file?.url || null;
    case 'url':
      return property[key] || null;
    case 'email':
      return property[key] || null;
    case 'phone_number':
      return property[key] || null;
    case 'checkbox':
      return property[key] || null;
    case 'relation':
      return property[key] || [];
    default:
      return null;
  }
};

const ActivityListData = async (pageId: string): Promise<any[]> => {
  const activityList = await queryPageId(pageId) as NotionPageResponse;
  if (!isPageObjectResponse(activityList)) {
    console.error('ActivityList response does not contain properties:', activityList);
    return [];
  }
  const subItems = activityList.properties["Sub-item"];
  if (subItems.type !== 'relation' || !Array.isArray(subItems.relation)) {
    console.error('Sub-item is not a relation or is not an array:', subItems);
    return [];
  }
  
  return Promise.all(subItems.relation.map(async (item) => {
    const activityKids = await queryPageId(item.id) as NotionPageResponse;
    if (isPageObjectResponse(activityKids)) {
      const properties = activityKids.properties;
      return {
        activity: extractProperty(properties.Activity, 'title'),
        name: extractProperty(properties.Name, 'rich_text'),
        status: extractProperty(properties.Status, 'status'),
        time: extractProperty(properties.Time, 'rich_text'),
        date: extractProperty(properties.Date, 'rich_text'),
        subLink: extractProperty(properties.SubLink, 'url'),
        videoLink: extractProperty(properties.VideoLink, 'url'),
        poster_1: extractProperty(properties.Poster_1, 'files'),
        poster_2: extractProperty(properties.Poster_2, 'files'),
      };
    } else {
      console.error('ActivityKids response does not contain properties:', activityKids);
      return {};
    }
  }));
};

const QueryAllActivity = async (response: { results: any[] }): Promise<any[]> => {
  const activityInfo = await Promise.all(response.results.map(async (result) => {
    const properties = result.properties;
    const activityListID = properties.List.relation[0]?.id;
    if (!activityListID) {
      console.error('Activity List ID not found for activity:', properties.ID.number);
      return null;
    }
    const activityListList = await ActivityListData(activityListID);
    
    return {
      id: extractProperty(properties.ID, 'number'),
      name: extractProperty(properties.Name, 'title'),
      des: extractProperty(properties.Des, 'rich_text'),
      activityList: activityListList,
    };
  }));

  return activityInfo.filter(Boolean);
};

const QueryActivity = async (response: { results: any[] }, id: string): Promise<any> => {
  const activity = response.results.find(result => result.properties.ID.number.toString() === id);
  
  if (!activity) {
    console.error('Activity not found for ID:', id);
    return null;
  }

  const properties = activity.properties;
  const activityListID = properties.List.relation[0]?.id;
  if (!activityListID) {
    console.error('Activity List ID not found for activity:', properties.ID.number);
    return null;
  }
  const activityListList = await ActivityListData(activityListID);

  return {
    id: extractProperty(properties.ID, 'number'),
    name: extractProperty(properties.Name, 'title'),
    des: extractProperty(properties.Des, 'rich_text'),
    activityList: activityListList,
  };
};

export { QueryAllActivity, QueryActivity };
