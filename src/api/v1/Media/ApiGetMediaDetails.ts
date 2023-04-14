import { ApiCall } from "tsrpc";
import {queryProjectAllDetail} from "../public";

import {ReqGetMediaDetails, ResGetMediaDetails} from "../../../shared/protocols/v1/Media/PtlGetMediaDetails";
import {MediaData} from "../../../components/media_data";

export default async function (call: ApiCall<ReqGetMediaDetails, ResGetMediaDetails>) {
    // Error
    if (call.req.databaseId === '') {
        await call.error('guild_id is empty');
        return;
    }

    const response = await queryProjectAllDetail(call.req.databaseId)
    let media_data = await MediaData(response.results)

    let time = new Date();

    // Success
    await call.succ({
        project_details:JSON.stringify(media_data),
        time
    });
}
