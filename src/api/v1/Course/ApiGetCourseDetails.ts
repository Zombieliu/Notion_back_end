import { ApiCall } from "tsrpc";
import {ReqGetCourseDetails, ResGetCourseDetails} from "../../../shared/protocols/v1/Course/PtlGetCourseDetails";
import {QueryCourseData,} from "../../../components/course_data";
import {queryProjectAllDetail} from "../public";
import {enCourseDatabaseId, znCourseDatabaseId} from "../../../components/constants";

export default async function (call: ApiCall<ReqGetCourseDetails, ResGetCourseDetails>) {
    // Error
    if (call.req.id === '') {
        await call.error('guild_id is empty');
        return;
    }
    const databaseId = call.req.locale == "cn" ? znCourseDatabaseId : enCourseDatabaseId
    const response = await queryProjectAllDetail(databaseId)
    let project_details = await QueryCourseData(response,call.req.id)

    let time = new Date();

    // Success
    await call.succ({
        project_details:JSON.stringify(project_details),
        time
    });


}
