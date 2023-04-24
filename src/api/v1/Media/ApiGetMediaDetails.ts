import { ApiCall } from "tsrpc";
import {queryProjectAllDetail} from "../public";
import {ReqGetMediaDetails, ResGetMediaDetails} from "../../../shared/protocols/v1/Media/PtlGetMediaDetails";
import {MediaData} from "../../../components/media_data";
import {
   enMediaDatabaseID,znMediaDatabaseID
} from "../../../components/constants";

export default async function (call: ApiCall<ReqGetMediaDetails, ResGetMediaDetails>) {
    // Error
    if (call.req.locale === '') {
        await call.error('guild_id is empty');
        return;
    }
    const databaseId = call.req.locale == "cn" ? znMediaDatabaseID : enMediaDatabaseID
    const response = await queryProjectAllDetail(databaseId)
    let media_data = await MediaData(response.results)

    let time = new Date();

    // Success
    await call.succ({
        project_details:JSON.stringify(media_data),
        time
    });
}
