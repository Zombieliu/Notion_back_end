import { ApiCall } from "tsrpc";
import { queryProjectAllDetail } from "../public";
import { ReqGetMediaDetails, ResGetMediaDetails } from "../../../shared/protocols/v1/Media/PtlGetMediaDetails";
import { MediaData } from "../../../components/media_data";
import { znDatabaseIds, enDatabaseIds } from "../../../components/constants";

export default async function (call: ApiCall<ReqGetMediaDetails, ResGetMediaDetails>) {
    const { locale } = call.req;

    // Error handling
    if (!locale) {
        return call.error('locale is empty');
    }

    // Determine database ID based on locale
    const databaseId = locale.toLowerCase() === "cn" ? znDatabaseIds.media : enDatabaseIds.media;

    try {
        const response = await queryProjectAllDetail(databaseId);
        const mediaData = await MediaData(response.results);

        // Success
        return call.succ({
            project_details: JSON.stringify(mediaData),
            time: new Date()
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return call.error(`Failed to fetch media details: ${error.message}`);
        } else {
            return call.error('Failed to fetch media details: Unknown error');
        }
    }
}
