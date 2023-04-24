import { ApiCall } from "tsrpc";
import {queryProjectAllDetailID} from "../public";
import {
    ReqGetActivityAllDetails,
    ResGetActivityAllDetails
} from "../../../shared/protocols/v1/Activity/PtlGetActivityAllDetails";
import {QueryAllActivity} from "../../../components/activity_data";
import {
    enActivityDatabaseID,
    znActivityDatabaseID
} from "../../../components/constants";

export default async function (call: ApiCall<ReqGetActivityAllDetails, ResGetActivityAllDetails>) {
    // Error
    if (call.req.locale === '') {
        await call.error('guild_id is empty');
        return;
    }
    const databaseId = call.req.locale == "cn" ? znActivityDatabaseID : enActivityDatabaseID
    const response = await queryProjectAllDetailID(databaseId)
    let   project_details = await QueryAllActivity(response)

    let time = new Date();

    // Success
    await call.succ({
        project_details:JSON.stringify(project_details),
        time
    });
}
