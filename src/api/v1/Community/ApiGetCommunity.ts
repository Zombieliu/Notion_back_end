import { ApiCall } from "tsrpc";
import { queryProjectAllDetail } from "../public";
import { ReqGetCommunity, ResGetCommunity } from "../../../shared/protocols/v1/Community/PtlGetCommunity";
import { MediaData } from "../../../components/media_data";
import { znDatabaseIds, enDatabaseIds } from "../../../components/constants";

export default async function (call: ApiCall<ReqGetCommunity, ResGetCommunity>) {
    const { locale } = call.req;

    if (!locale) {
        return call.error('Locale is required');
    }

    const databaseId = locale.toLowerCase() === "cn" ? znDatabaseIds.community : enDatabaseIds.community;
    const response = await queryProjectAllDetail(databaseId);
    const mediaData = await MediaData(response.results);

    await call.succ({
        project_details: JSON.stringify(mediaData),
        time: new Date()
    });
}
