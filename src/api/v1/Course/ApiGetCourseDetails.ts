import { ApiCall } from "tsrpc";
import {ReqGetCourseDetails, ResGetCourseDetails} from "../../../shared/protocols/v1/Course/PtlGetCourseDetails";
import {QueryCourseData,} from "../../../components/course_data";
import {queryProjectAllDetail} from "../public";
import {znDatabaseIds, enDatabaseIds} from "../../../components/constants";

export default async function (call: ApiCall<ReqGetCourseDetails, ResGetCourseDetails>) {
    try {
        const { id, locale } = call.req;

        if (!id) {
            throw new Error('guild_id is empty');
        }

        const databaseId = locale === "cn" ? znDatabaseIds.course : enDatabaseIds.course;
        const response = await queryProjectAllDetail(databaseId);

        if (!response) {
            throw new Error('No response from queryProjectAllDetail');
        }

        const projectDetails = await QueryCourseData(response, id);

        if (!projectDetails) {
            throw new Error('No project details found');
        }

        // Success
        await call.succ({
            project_details: JSON.stringify(projectDetails),
            time: new Date()
        });
    } catch (error) {
        console.error('Error in ApiGetCourseDetails:', error);
        await call.error('Internal Server Error', { cause: error });
    }
}
