import { ApiCall } from "tsrpc";
import {
    ReqGetCourseAllDetails,ResGetCourseAllDetails
} from "../../../shared/protocols/v1/Course/PtlGetCourseAllDetails";
import {queryProjectAllDetailID} from "../public";
import {QueryAllCourse} from "../../../components/course_data";
import {znDatabaseIds, enDatabaseIds} from "../../../components/constants";

export default async function (call: ApiCall<ReqGetCourseAllDetails, ResGetCourseAllDetails>) {
    // Error
    if (call.req.locale === '') {
        await call.error('guild_id is empty');
        return;
    }

    try {
        const databaseId = call.req.locale == "cn" ? znDatabaseIds.course : enDatabaseIds.course
        const response = await queryProjectAllDetailID(databaseId)
        
        if (!response) {
            throw new Error("No response from queryProjectAllDetailID");
        }
        
        let project_details = await QueryAllCourse(response)
        
        if (!project_details) {
            throw new Error("No project details returned from QueryAllCourse");
        }

        let time = new Date();

        // Success
        await call.succ({
            project_details: JSON.stringify(project_details),
            time
        });
    } catch (error) {
        console.error("Error in ApiGetCourseAllDetails:", error);
        await call.error(`Internal Server Error: ${(error as Error).message}`);
    }
}
