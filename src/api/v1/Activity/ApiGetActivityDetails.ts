import { ApiCall } from "tsrpc";
import {queryProjectAllDetailID} from "../public";
import {
    ReqGetActivityAllDetails,
    ResGetActivityAllDetails
} from "../../../shared/protocols/v1/Activity/PtlGetActivityAllDetails";
import {QueryActivity, QueryAllActivity} from "../../../components/activity_data";
import {
    enActivityDatabaseID,
    znActivityDatabaseID
} from "../../../components/constants";
import {
    ReqGetActivityDetails,
    ResGetActivityDetails
} from "../../../shared/protocols/v1/Activity/PtlGetActivityDetails";

export default async function (call: ApiCall<ReqGetActivityDetails, ResGetActivityDetails>) {
    // Error
    if (call.req.locale === '') {
        await call.error('guild_id is empty');
        return;
    }
    const databaseId = call.req.locale == "cn" ? znActivityDatabaseID : enActivityDatabaseID
    const response = await queryProjectAllDetailID(databaseId)
    let   project_details = await QueryActivity(response,call.req.id)

    let time = new Date();

    // Success
    await call.succ({
        project_details:JSON.stringify(project_details),
        time
    });
}
