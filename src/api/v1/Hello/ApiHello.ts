import { ApiCall } from "tsrpc";
import {ReqHello, ResHello} from "../../../shared/protocols/v1/Hello/PtlHello";


export default async function (call: ApiCall<ReqHello, ResHello>) {
    // Error
    if (call.req.hello === '') {
        await call.error('guild_id is empty');
        return;
    }

    let time = new Date();
    // Success
    await call.succ({
        time
    });








}
