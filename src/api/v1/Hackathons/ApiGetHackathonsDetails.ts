import { ApiCall } from "tsrpc";
import { queryProjectAllDetailID } from "../public";
import {
    ReqGetHackathonsDetails,
    ResGetHackathonsDetails
} from "../../../shared/protocols/v1/Hackathons/PtlGetHackathonsDetails";
import { HackathonsData } from "../../../components/Hackathons";
import {
    znDatabaseIds,
    enDatabaseIds
} from "../../../components/constants";

export default async function (call: ApiCall<ReqGetHackathonsDetails, ResGetHackathonsDetails>) {
    const { locale } = call.req;

    if (!locale) {
        return call.error('Locale is empty');
    }

    const databaseId = locale === "cn" ? znDatabaseIds.hackathons : enDatabaseIds.hackathons;
    const response = await queryProjectAllDetailID(databaseId);
    const hackathonsData = await HackathonsData(response.results);

    await call.succ({
        project_details: JSON.stringify(hackathonsData),
        time: new Date()
    });
}
