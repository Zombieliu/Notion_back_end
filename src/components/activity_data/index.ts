import {CommunityRecommendationData, TypeData} from "../course_data";
import {queryPageId} from "../../api/v1/public";


const ActivityListData = async (pageId: any) => {

    let Activity_List = await queryPageId(pageId)
    // @ts-ignore
    let Activity_Data =  Activity_List.properties["Sub-item"].relation
    let Activity_DataList = []
    for (let i = 0; i < Activity_Data.length; i++) {
        const activityKids = await queryPageId(Activity_Data[i].id)
        // @ts-ignore
        let activityKidsData = await activityKids.properties
        let activity_dataList = {
            activity: activityKidsData.Activity.title[0].plain_text,
            name: activityKidsData.Name.rich_text[0].plain_text,
            status: activityKidsData.Status.status.name,
            time: activityKidsData.Time.rich_text[0].plain_text,
            date: activityKidsData.Date.rich_text[0].plain_text,
            subLink: activityKidsData.SubLink.url ? activityKidsData.SubLink.url : "",
            videoLink: activityKidsData.VideoLink.url ? activityKidsData.VideoLink.url : "",
            poster_1: activityKidsData.Poster_1.files[0] ? activityKidsData.Poster_1.files[0].file.url : "",
            poster_2: activityKidsData.Poster_2.files[0] ? activityKidsData.Poster_2.files[0].file.url:"",
        }
        Activity_DataList.push(activity_dataList)

    }
    Activity_DataList.reverse()
    return Activity_DataList

}

const QueryAllActivity = async (response: { results: string | any[];}) =>{
    const Activity_info = []
    for (let activity_length = 0; activity_length < response.results.length; activity_length++) {
        let activityListID = await response.results[activity_length].properties.List.relation[0].id
        let ActivityListList = await ActivityListData(activityListID)

        let activity_info =
            {
                id:    response.results[activity_length].properties.ID.number,
                name:  response.results[activity_length].properties.Name.title[0].plain_text,
                des:   response.results[activity_length].properties.Des.rich_text[0].plain_text,
                activityList: ActivityListList,
            }

        Activity_info.push(activity_info)
    }
    return Activity_info
}


const QueryActivity = async (response: { results: string | any[] }, id: string) =>{
        const i = Number(id)-1

        let activityListID = await response.results[i].properties.List.relation[0].id

        let ActivityListList = await ActivityListData(activityListID)

        let Activity_info =
            {
                id:    response.results[i].properties.ID.number,
                name:  response.results[i].properties.Name.title[0].plain_text,
                des:   response.results[i].properties.Des.rich_text[0].plain_text,
                activityList: ActivityListList,
            }

    return Activity_info
}



export {QueryAllActivity,QueryActivity}
