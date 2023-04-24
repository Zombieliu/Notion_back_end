import { ApiCall } from "tsrpc";
import {
    ReqGetCourseAllDetails,ResGetCourseAllDetails
} from "../../../shared/protocols/v1/Course/PtlGetCourseAllDetails";
import {queryProjectAllDetailID} from "../public";
import {QueryAllCourse} from "../../../components/course_data";
import {enCourseDatabaseId, znCourseDatabaseId} from "../../../components/constants";

export default async function (call: ApiCall<ReqGetCourseAllDetails, ResGetCourseAllDetails>) {
    // Error
    if (call.req.locale === '') {
        await call.error('guild_id is empty');
        return;
    }

    const databaseId = call.req.locale == "cn" ? znCourseDatabaseId : enCourseDatabaseId
    const response = await queryProjectAllDetailID(databaseId)
    let project_details = await QueryAllCourse(response)



    let time = new Date();

    // Success
    await call.succ({
        project_details:JSON.stringify(project_details),
        time
    });
}
