import {notion_client} from "../../client";
import {queryPageId} from "../../api/v1/public";

const TypeData  = (response: string | any[]) =>{
    let TypeList = []
    for (let type_length = 0 ;type_length<response.length;type_length++){
        const type = {content:response[type_length].name}
        TypeList.push(type)
    }
    return TypeList
}

const CommunityRecommendationData = async (pageId: any) => {

    let Community_recommendation = await queryPageId(pageId)
    // @ts-ignore
    let Community_recommendationData =  Community_recommendation.properties["Sub-item"].relation
    let Community_recommendationList = []
    for (let community_recommendation_length = 0; community_recommendation_length < Community_recommendationData.length; community_recommendation_length++) {
        const Community_recommendationKids = await queryPageId(Community_recommendationData[community_recommendation_length].id)
        // @ts-ignore
        let Community_recommendationKidsData = Community_recommendationKids.properties
        let community_recommendation = {
            name: Community_recommendationKidsData.Name.title[0].plain_text,
            position: Community_recommendationKidsData.Position.rich_text[0].plain_text,
            img: Community_recommendationKidsData.Img.files[0].file.url,
            name2: Community_recommendationKidsData.Name2.rich_text[0] ? Community_recommendationKidsData.Name2.rich_text[0].plain_text : "",
            position2: Community_recommendationKidsData.Position2.rich_text[0] ? Community_recommendationKidsData.Position2.rich_text[0].plain_text : "",
            img2: Community_recommendationKidsData.Img2.files[0] ? Community_recommendationKidsData.Img2.files[0].file.url : "",
            text: Community_recommendationKidsData.Text.rich_text[0].plain_text,
        }
        Community_recommendationList.push(community_recommendation)

    }
    return Community_recommendationList

}

const TeacherData = async (pageId: string | any[])=>{

    let TeacherList = []

    for(let i = 0 ;i < pageId.length;i++){
        let response = await queryPageId(pageId[i].id)
        // @ts-ignore
        // @ts-ignore
        const teacher_data = await response.properties
        const teacherList = {
            name: teacher_data.Name.title[0].plain_text,
            img: teacher_data.Img.files[0].file.url,
            title: teacher_data.Title.rich_text[0].plain_text,
            introduction: teacher_data.Introduction.rich_text[0].plain_text
        }
        TeacherList.push(teacherList)
    }
    return TeacherList

}

const ProjectProviderData = async (pageId: string | any[]) =>{
    let ProjectProviderList = []

    for(let i = 0 ;i < pageId.length;i++){
        let response = await queryPageId(pageId[i].id)
        // @ts-ignore
        const project_provider_data = await response.properties
        const project_provider_list = {
            name: project_provider_data.Name.title[0].plain_text,
            img: project_provider_data.Img.files[0].file.url,
        }
        ProjectProviderList.push(project_provider_list)
    }
    return ProjectProviderList

}

const TargetData = async (pageId: string | any[]) =>{
    let TargetList = []

    for(let i = 0 ;i < pageId.length;i++){
        let response = await queryPageId(pageId[i].id)
        // @ts-ignore
        const target_data = await response.properties
        const target_list = {
            name: target_data.Name.title[0].plain_text,
        }
        TargetList.push(target_list)

    }
    return TargetList

}

const MethodData = async (pageId: string | any[]) =>{
    let MethodList = []

    for(let i = 0 ;i < pageId.length;i++){
        let response = await queryPageId(pageId[i].id)
        // @ts-ignore
        const method_data = await response.properties
        const method_list = {
            name: method_data.Name.title[0].plain_text,
            img: method_data.Img.files[0].file.url,
        }
        MethodList.push(method_list)
    }
    return MethodList

}

const CommunitySupportData = async (pageId: string | any[]) =>{
    let CommunitySupportList = []
    for(let i = 0 ;i < pageId.length;i++){
        let response = await queryPageId(pageId[i].id)
        // @ts-ignore
        const community_support_data = await response.properties
        const community_support_list = {
            name: community_support_data.Name.title[0].plain_text,
            icon: community_support_data.Icon.rich_text[0].plain_text,
        }
        CommunitySupportList.push(community_support_list)
    }
    return CommunitySupportList

}

const CourseData = async (pageId: { id: any }[]) =>{
    let CourseDataList = []
    let response = await queryPageId(pageId[0].id)
    // @ts-ignore
    let course_data = await response.properties["Sub-item"].relation
    for(let i=0; i <course_data.length ; i++){
        let response = await queryPageId(course_data[i].id)
        // @ts-ignore
        let courseKidData = await response.properties
        let ContentList = []
        let course_kid2_data  = await courseKidData["Sub-item"].relation

        for(let x=0;x< course_kid2_data.length;x++){
            let response = await queryPageId(course_kid2_data[x].id)
            // @ts-ignore
            let contentKid2Data = response.properties
            let courseKid2Data={
                text:contentKid2Data.Name.title[0].plain_text
            }
            ContentList.push(courseKid2Data)
        }
        let courseKidDataList = {
            name: courseKidData.Name.title[0].plain_text,
            content: ContentList
        }
       await CourseDataList.push(courseKidDataList)
    }


    return  CourseDataList
}

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

const QueryCourseData = async (response: { results: string | any[]; },id: string) => {
     let project_details = []
    for (let i=0;i<response.results.length;i++){
        // @ts-ignore
        if (response.results[i].properties.ID.number.toString() == id){
            // @ts-ignore
            let typeData = await response.results[i].properties.Type.multi_select
            let TypeList = TypeData(typeData)

            // @ts-ignore
            let Community_recommendationList

            if(response.results[i].properties.Community_recommendation.relation[0]){
                let Community_recommendationPageId = await response.results[i].properties.Community_recommendation.relation[0].id
                 Community_recommendationList = await CommunityRecommendationData(Community_recommendationPageId)
            }else {
                Community_recommendationList = [{}]
            }


            // @ts-ignore
            let TeacherPageId = await response.results[i].properties.Teacher.relation;
            let Teacher_List = await TeacherData(TeacherPageId)

            // @ts-ignore
            let ProjectProviderPageId = await response.results[i].properties.Project_provider.relation
            let Project_providerList = await ProjectProviderData(ProjectProviderPageId)

            // @ts-ignore
            let TargetPageId = await  response.results[i].properties.Target.relation
            let Target_List = await TargetData(TargetPageId)

            // @ts-ignore
            let MethodPageId = await  response.results[i].properties.Method.relation
            let Method_List = await MethodData(MethodPageId)

            // @ts-ignore
            let CommunitySupportPageId = await  response.results[i].properties.Community_support.relation
            let Community_support_List = await CommunitySupportData(CommunitySupportPageId)

            // @ts-ignore
            let CourseDataPageId = await response.results[i].properties.Course_data.relation
            let Course_list = await CourseData(CourseDataPageId)


            let course_info =
                {

                    id: response.results[i].properties.ID.number,

                    name: response.results[i].properties.Name.title[0].plain_text,

                    cycle: response.results[i].properties.Cycle.rich_text[0].plain_text,

                    img: response.results[i].properties.Img.files[0].file.url,

                    title: response.results[i].properties.Title.rich_text[0].plain_text,

                    link: response.results[i].properties.Link.url,

                    state: response.results[i].properties.State.status.name,

                    homeDisplay:response.results[i].properties.HomeDisplay.status.name,

                    startTime: response.results[i].properties.StartTime.rich_text[0].plain_text,

                    endTime: response.results[i].properties.EndTime.rich_text[0].plain_text,
                    type: TypeList,
                    course_data:Course_list,
                    community_recommendation: Community_recommendationList,
                    teacher: Teacher_List,
                    project_provider: Project_providerList,
                    method:Method_List,
                    target: Target_List,
                    community_support: Community_support_List
                }

            project_details.push(course_info)

        }
    }


    return project_details
}

export {QueryAllCourse,QueryCourseData,TypeData,CommunityRecommendationData,TeacherData,ProjectProviderData,TargetData,MethodData,CommunitySupportData,CourseData}
