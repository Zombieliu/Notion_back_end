import { ApiCall } from "tsrpc";
import {ReqGetCourseDetails, ResGetCourseDetails} from "../../../shared/protocols/v1/Course/PtlGetCourseDetails";
import {QueryCourseData,} from "../../../components/course_data";
import {queryProjectAllDetail} from "../public";

export default async function (call: ApiCall<ReqGetCourseDetails, ResGetCourseDetails>) {
    // Error
    if (call.req.id === '') {
        await call.error('guild_id is empty');
        return;
    }

    const response = await queryProjectAllDetail(call.req.databaseId)
    let project_details = await QueryCourseData(response,call.req.id)

    let time = new Date();

    // Success
    await call.succ({
        project_details:JSON.stringify(project_details),
        time
    });


}
