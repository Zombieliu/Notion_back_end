import {queryPageId} from "../../api/v1/public";
import { GetPageResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// 定义一个更通用的属性类型
type PropertyValue = {
  type: string;
  [key: string]: any;
};

// 更新 CourseProperty 接口
interface CourseProperty {
  [key: string]: PropertyValue;
}

// 更新 CourseProperties 接口
interface CourseProperties {
  [key: string]: CourseProperty;
}

// 更新 PageResponse 接口
interface PageResponse {
  properties: CourseProperties;
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

  // Check if 'type' exists in the property object
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

const TypeData = (response: any[]): { content: string }[] =>
  response.map(item => ({ content: item.name }));

const CommunityRecommendationData = async (pageId: string): Promise<any[]> => {
  const community = await queryPageId(pageId) as NotionPageResponse;
  if (!isPageObjectResponse(community)) {
    console.error('Community response does not contain properties:', community);
    return [];
  }
  const subItems = community.properties["Sub-item"];
  if (subItems.type !== 'relation' || !Array.isArray(subItems.relation)) {
    console.error('Sub-item is not a relation or is not an array:', subItems);
    return [];
  }
  
  return Promise.all(subItems.relation.map(async (item) => {
    const kidData = await queryPageId(item.id) as NotionPageResponse;
    if (isPageObjectResponse(kidData)) {
      const properties = kidData.properties;
      return {
        name: extractProperty(properties.Name, 'title'),
        position: extractProperty(properties.Position, 'rich_text'),
        img: extractProperty(properties.Img, 'files'),
      name2: extractProperty(properties.Name2, 'rich_text'),
      position2: extractProperty(properties.Position2, 'rich_text'),
      img2: extractProperty(properties.Img2, 'files'),
      text: extractProperty(properties.Text, 'rich_text'),
    };
    } else {
      console.error('KidData response does not contain properties:', kidData);
      return {};
    }
  }));
};

const TeacherData = (data: CourseProperties) => ({
      // @ts-ignore
  name: extractProperty(data.Name, 'title'),
  // @ts-ignore
  img: extractProperty(data.Img, 'files'),
    // @ts-ignore
  title: extractProperty(data.Title, 'rich_text'),
    // @ts-ignore
  introduction: extractProperty(data.Introduction, 'rich_text'),
});

const ProjectProviderData = (data: CourseProperties) => ({
      // @ts-ignore
  name: extractProperty(data.Name, 'title'),
    // @ts-ignore
  img: extractProperty(data.Img, 'files'),
});

const TargetData = (data: CourseProperties) => ({
  // @ts-ignore
  name: extractProperty(data.Name, 'title'),
});

const MethodData = (data: CourseProperties) => ({
  // @ts-ignore
  name: extractProperty(data.Name, 'title'),
  // @ts-ignore
  img: extractProperty(data.Img, 'files'),
});

const CommunitySupportData = (data: CourseProperties) => ({
      // @ts-ignore
  name: extractProperty(data.Name, 'title'),
    // @ts-ignore
  icon: extractProperty(data.Icon, 'rich_text'),
});

const CourseData = async (pageId: { id: string }[]): Promise<any[]> => {
  const response = await queryPageId(pageId[0].id);
  if (!isPageObjectResponse(response)) {
    console.error('Response is not a PageObjectResponse:', response);
    return [];
  }
  const subItems = response.properties["Sub-item"];
  if (subItems.type !== 'relation' || !Array.isArray(subItems.relation)) {
    console.error('Sub-item is not a relation or is not an array:', subItems);
    return [];
  }

  return Promise.all(subItems.relation.map(async (item: { id: string }) => {
    const kidResponse = await queryPageId(item.id);
    if (!isPageObjectResponse(kidResponse)) {
      console.error('KidResponse is not a PageObjectResponse:', kidResponse);
      return {};
    }
    const kidProperties = kidResponse.properties;
    if (kidProperties["Sub-item"].type !== 'relation' || !Array.isArray(kidProperties["Sub-item"].relation)) {
      console.error('Sub-item is not a relation or is not an array:', kidProperties["Sub-item"]);
      return {};
    }
    const contentList = await processData(kidProperties["Sub-item"].relation, 
      (data) => ({ text: extractProperty(data.Name, 'title') }));

    return {
      name: extractProperty(kidProperties.Name, 'title'),
      content: contentList,
    };
  }));
};

const QueryAllCourse = async (response: { results: string | any[];}) =>{
    const Course_info = []


    for (let course_length = 0; course_length < response.results.length; course_length++) {
        let typeData = response.results[course_length].properties.Type.multi_select
        let TypeList = TypeData(typeData)
        let course_info =
            {
                id:    response.results[course_length].properties.ID.number,
                name:  response.results[course_length].properties.Name.title[0].plain_text,
                img:   response.results[course_length].properties.Img.files[0].file.url,
                link:  response.results[course_length].properties.Link.url,
                state: response.results[course_length].properties.State.status.name,
                homeDisplay:response.results[course_length].properties.HomeDisplay.status.name,
                type: TypeList,
                  }

        Course_info.push(course_info)
    }
    return Course_info
}

const QueryCourseData = async (response: { results: any[] }, id: string) => {
  try {
    const course = response.results.find(result => result.properties.ID.number.toString() === id);
    
    if (!course) {
      return [];
    }

    const {
      Type,
      Community_recommendation,
      Teacher,
      Project_provider,
      Target,
      Method,
      Community_support,
      Course_data,
      ...otherProperties
    } = course.properties;

    const TypeList = TypeData(Type.multi_select);

    const Community_recommendationList = Community_recommendation.relation[0]
      ? await CommunityRecommendationData(Community_recommendation.relation[0].id)
      : [{}];

    const [
      Teacher_List,
      Project_providerList,
      Target_List,
      Method_List,
      Community_support_List,
      Course_list
    ] = await Promise.all([
      TeacherData(Teacher.relation),
      ProjectProviderData(Project_provider.relation),
      TargetData(Target.relation),
      MethodData(Method.relation),
      CommunitySupportData(Community_support.relation),
      CourseData(Course_data.relation)
    ]);

    const course_info = {
      id: otherProperties.ID.number,
      name: otherProperties.Name.title[0].plain_text,
      cycle: otherProperties.Cycle.rich_text[0].plain_text,
      img: otherProperties.Img.files[0].file.url,
      title: otherProperties.Title.rich_text[0].plain_text,
      link: otherProperties.Link.url,
      state: otherProperties.State.status.name,
      homeDisplay: otherProperties.HomeDisplay.status.name,
      startTime: otherProperties.StartTime.rich_text[0].plain_text,
      endTime: otherProperties.EndTime.rich_text[0].plain_text,
      type: TypeList,
      course_data: Course_list,
      community_recommendation: Community_recommendationList,
      teacher: Teacher_List,
      project_provider: Project_providerList,
      method: Method_List,
      target: Target_List,
      community_support: Community_support_List
    };

    console.log('Course data before processing:', course_info);
    const result = course_info;
    console.log('Processed course data:', result);

    return [result];
  } catch (error) {
    console.error('Error in QueryCourseData:', error);
    throw error;
  }
};

export {QueryAllCourse,QueryCourseData,TypeData,CommunityRecommendationData,TeacherData,ProjectProviderData,TargetData,MethodData,CommunitySupportData,CourseData}
