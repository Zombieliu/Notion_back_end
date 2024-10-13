import { ApiCall } from "tsrpc";
import {ReqGetCourseDetails, ResGetCourseDetails} from "../../../shared/protocols/v1/Course/PtlGetCourseDetails";
import {QueryCourseData,} from "../../../components/course_data";
import {queryProjectAllDetail} from "../public";
import {enCourseDatabaseId, znCourseDatabaseId} from "../../../components/constants";

export default async function (call: ApiCall<ReqGetCourseDetails, ResGetCourseDetails>) {
    try {
        // Error checking
        if (call.req.id === '') {
            throw new Error('guild_id is empty');
        }

        const databaseId = call.req.locale == "cn" ? znCourseDatabaseId : enCourseDatabaseId;
        const response = await queryProjectAllDetail(databaseId);

        if (!response) {
            throw new Error('No response from queryProjectAllDetail');
        }

        console.log('Response:', JSON.stringify(response)); // Log the response

        let project_details = await QueryCourseData(response, call.req.id);

        if (!project_details) {
            throw new Error('No project details found');
        }

        console.log('Project details:', JSON.stringify(project_details)); // Log the project details

        let time = new Date();

        // Success
        await call.succ({
            project_details: JSON.stringify(project_details),
            time
        });
    } catch (error) {
        console.error('Error in ApiGetCourseDetails:', error);
        await call.error('Internal Server Error', { cause: error });
    }
}
