import { ApiCall } from "tsrpc";
import { ReqGetCommunity, ResGetCommunity } from "../../../shared/protocols/v1/Communtiy/PtlGetCommunity";

export default async function (call: ApiCall<ReqGetCommunity, ResGetCommunity>) {
    // TODO
    call.error('API Not Implemented');
}