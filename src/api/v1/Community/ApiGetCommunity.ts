import { ApiCall } from "tsrpc";
import { queryProjectAllDetail } from "../public";
import { ReqGetCommunity, ResGetCommunity } from "../../../shared/protocols/v1/Community/PtlGetCommunity";
import { MediaData } from "../../../components/media_data";
import { znDatabaseIds, enDatabaseIds } from "../../../components/constants";
// import { validate as uuidValidate } from 'uuid';

export default async function (call: ApiCall<ReqGetCommunity, ResGetCommunity>) {
    const { locale } = call.req;

    if (!locale) {
        return call.error('Locale is required');
    }

    const databaseId = locale.toLowerCase() === "cn" ? znDatabaseIds.community : enDatabaseIds.community;

    // if (!uuidValidate(databaseId)) {
    //     console.error(`Invalid database ID for locale ${locale}: ${databaseId}`);
    //     return call.error('Invalid database configuration', { code: 'INVALID_DB' });
    // }

    try {
        // Remove any quotes around the UUID if present
        const cleanDatabaseId = databaseId.replace(/^["']|["']$/g, '');

        const response = await queryProjectAllDetail(cleanDatabaseId);

        const mediaData = await MediaData(response.results);

        await call.succ({
            project_details: JSON.stringify(mediaData),
            time: new Date()
        });
    } catch (error) {
        if (error instanceof Error) {
            return call.error('Internal Server Error', { 
                code: 'INTERNAL_ERR',
                innerErr: error.message
            });
        } else {
            return call.error('Internal Server Error', { 
                code: 'INTERNAL_ERR',
                innerErr: 'Unknown error occurred'
            });
        }
    }
}
