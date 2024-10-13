import { ApiCall } from "tsrpc";
import { queryProjectAllDetailID } from "../public";
import {
    ReqGetActivityDetails,
    ResGetActivityDetails
} from "../../../shared/protocols/v1/Activity/PtlGetActivityDetails";
import { QueryActivity } from "../../../components/activity_data";
import {
    znDatabaseIds,
    enDatabaseIds
} from "../../../components/constants";

export default async function (call: ApiCall<ReqGetActivityDetails, ResGetActivityDetails>) {
    const { locale, id } = call.req;

    // Error handling
    if (!locale) {
        return call.error('locale is empty');
    }

    const databaseId = locale === "cn" ? znDatabaseIds.activity : enDatabaseIds.activity;
    const response = await queryProjectAllDetailID(databaseId);
    const projectDetails = await QueryActivity(response, id);

    // Success
    return call.succ({
        project_details: JSON.stringify(projectDetails),
        time: new Date()
    });
}
