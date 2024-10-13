import { ApiCall } from "tsrpc";
import { queryProjectAllDetailID } from "../public";
import {
    ReqGetActivityAllDetails,
    ResGetActivityAllDetails
} from "../../../shared/protocols/v1/Activity/PtlGetActivityAllDetails";
import { QueryAllActivity } from "../../../components/activity_data";
import {
    znDatabaseIds,
    enDatabaseIds
} from "../../../components/constants";

export default async function (call: ApiCall<ReqGetActivityAllDetails, ResGetActivityAllDetails>) {
    const { locale } = call.req;

    if (!locale) {
        return call.error('Locale is required');
    }

    const databaseId = locale === "cn" ? znDatabaseIds.activity : enDatabaseIds.activity;
    
    try {
        const response = await queryProjectAllDetailID(databaseId);
        const projectDetails = await QueryAllActivity(response);
        
        return call.succ({
            project_details: JSON.stringify(projectDetails),
            time: new Date()
        });
    } catch (error) {
        console.error('Error fetching activity details:', error);
        return call.error('Failed to fetch activity details');
    }
}
