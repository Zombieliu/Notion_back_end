import { ApiCall } from "tsrpc";
import {request} from "undici";
import {ReqGetDcUserInfo, ResGetDcUserInfo} from "../../../shared/protocols/v1/User/PtlGetDcUserInfo";
import {AppDataSource} from "../../../data-source";
import {DcUser} from "../../../entity/DcUser";

export default async function (call: ApiCall<ReqGetDcUserInfo, ResGetDcUserInfo>) {
    // Error
    if (call.req.user_id === '') {
        await call.error('tx_hash is empty');
        return;
    }

    let time = new Date();


    const result = await AppDataSource.getRepository(DcUser).findOneBy({
        user_id:call.req.user_id
    })

    if (result != null){
        const userResult = await request('https://discord.com/api/users/@me', {
            headers: {
                authorization: `Bearer ${result.access_token}`,
            },

        });
        const user_info =  JSON.stringify(await userResult.body.json())
        // Success
        await call.succ({
            user_info,
            time
        });
    }else{
        await call.error('no id ');
        return;
    }


}
