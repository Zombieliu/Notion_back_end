import { ApiCall } from "tsrpc";
import {
    ReqGetCourseAllDetails,ResGetCourseAllDetails
} from "../../../shared/protocols/v1/Course/PtlGetCourseAllDetails";
import {queryProjectAllDetailID} from "../public";
import {QueryAllCourse} from "../../../components/course_data";

export default async function (call: ApiCall<ReqGetCourseAllDetails, ResGetCourseAllDetails>) {
    // Error
    if (call.req.databaseId === '') {
        await call.error('guild_id is empty');
        return;
    }

    const response = await queryProjectAllDetailID(call.req.databaseId)
    let project_details = await QueryAllCourse(response)

    let time = new Date();

    // Success
    await call.succ({
        project_details:JSON.stringify(project_details),
        time
    });
}
