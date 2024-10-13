import { ApiCall } from "tsrpc";
import { queryProjectAllDetail } from "../public";
import {
    ReqGetCommunityMemberDetails,
    ResGetCommunityMemberDetails
} from "../../../shared/protocols/v1/CommunityMember/PtlGetCommunityMemberDetails";
import { CommunityMemberData } from "../../../components/communityMember_data/index";
import {
    znDatabaseIds,
    enDatabaseIds
} from "../../../components/constants";

export default async function (call: ApiCall<ReqGetCommunityMemberDetails, ResGetCommunityMemberDetails>) {
    const { locale } = call.req;

    if (!locale) {
        return call.error('Locale is required');
    }

    const databaseId = locale.toLowerCase() === "cn" ? znDatabaseIds.communityMember : enDatabaseIds.communityMember;
    
    try {
        const response = await queryProjectAllDetail(databaseId);
        const communityMemberData = await CommunityMemberData(response.results);

        return call.succ({
            project_details: JSON.stringify(communityMemberData),
            time: new Date()
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return call.error(`Failed to fetch community member details: ${error.message}`);
        } else {
            return call.error('Failed to fetch community member details: Unknown error');
        }
    }
}
