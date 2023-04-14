import { ApiCall } from "tsrpc";
import {queryProjectAllDetail} from "../public";
import {
    ReqGetCommunityMemberDetails,
    ResGetCommunityMemberDetails
} from "../../../shared/protocols/v1/CommunityMember/PtlGetCommunityMemberDetails";
import {CommunityMemberData} from "../../../components/communityMember_data/index";

export default async function (call: ApiCall<ReqGetCommunityMemberDetails, ResGetCommunityMemberDetails>) {
    // Error
    if (call.req.databaseId === '') {
        await call.error('guild_id is empty');
        return;
    }

    const response = await queryProjectAllDetail(call.req.databaseId)
    let communityMember_data = await CommunityMemberData(response.results)

    let time = new Date();

    // Success
    await call.succ({
        project_details:JSON.stringify(communityMember_data),
        time
    });
}
