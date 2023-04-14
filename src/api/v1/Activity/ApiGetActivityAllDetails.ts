import { ApiCall } from "tsrpc";
import {queryProjectAllDetailID} from "../public";
import {
    ReqGetActivityAllDetails,
    ResGetActivityAllDetails
} from "../../../shared/protocols/v1/Activity/PtlGetActivityAllDetails";
import {QueryAllActivity} from "../../../components/activity_data";

export default async function (call: ApiCall<ReqGetActivityAllDetails, ResGetActivityAllDetails>) {
    // Error
    if (call.req.databaseId === '') {
        await call.error('guild_id is empty');
        return;
    }

    const response = await queryProjectAllDetailID(call.req.databaseId)
    let   project_details = await QueryAllActivity(response)

    console.log(project_details)

    let time = new Date();

    // Success
    await call.succ({
        project_details:JSON.stringify(project_details),
        time
    });
}
