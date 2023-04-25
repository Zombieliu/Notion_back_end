import { ApiCall } from "tsrpc";
import {queryProjectAllDetail} from "../public";
import {ReqGetMediaDetails, ResGetMediaDetails} from "../../../shared/protocols/v1/Media/PtlGetMediaDetails";
import {MediaData} from "../../../components/media_data";
import {
    enCommunityDatabaseID,
    enMediaDatabaseID, znCommunityDatabaseID, znMediaDatabaseID
} from "../../../components/constants";
import {ReqGetCommunity, ResGetCommunity} from "../../../shared/protocols/v1/Community/PtlGetCommunity";

export default async function (call: ApiCall<ReqGetCommunity, ResGetCommunity>) {
    // Error
    if (call.req.locale === '') {
        await call.error('guild_id is empty');
        return;
    }
    const databaseId = call.req.locale == "cn" ? znCommunityDatabaseID : enCommunityDatabaseID
    const response = await queryProjectAllDetail(databaseId)
    let media_data = await MediaData(response.results)

    let time = new Date();

    // Success
    await call.succ({
        project_details:JSON.stringify(media_data),
        time
    });
}
