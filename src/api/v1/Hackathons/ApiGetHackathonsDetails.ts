import { ApiCall } from "tsrpc";
import {queryProjectAllDetailID} from "../public";
import {
    ReqGetHackathonsDetails,
    ResGetHackathonsDetails
} from "../../../shared/protocols/v1/Hackathons/PtlGetHackathonsDetails";
import {HackathonsData} from "../../../components/Hackathons";

export default async function (call: ApiCall<ReqGetHackathonsDetails, ResGetHackathonsDetails>) {
    // Error
    if (call.req.databaseId === '') {
        await call.error('guild_id is empty');
        return;
    }

    const response = await queryProjectAllDetailID(call.req.databaseId)
    let hackathons_data = await HackathonsData(response.results)


    let time = new Date();

    // Success
    await call.succ({
        project_details:JSON.stringify(hackathons_data),
        time
    });
}
