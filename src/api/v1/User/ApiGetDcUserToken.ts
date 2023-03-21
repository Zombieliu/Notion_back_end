import { ApiCall } from "tsrpc";
import {request} from "undici";
import {AppDataSource} from "../../../data-source";
import {DcUser} from "../../../entity/DcUser";
import {ReqGetDcUserToken, ResGetDcUserToken} from "../../../shared/protocols/v1/User/PtlGetDcUserToken";

export default async function (call: ApiCall<ReqGetDcUserToken, ResGetDcUserToken>) {
    // Error
    if (call.req.code === '') {
        await call.error('tx_hash is empty');
        return;
    }

    let time = new Date();
    const port = 3000


    const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: '1085234510649622548',
        client_secret: 'HKGaABLMhZ03pLTF7-ADMIedn0isWSdz',
        code: call.req.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://localhost:${port}/dashboard`,
        scope: 'identify guilds',
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const oauthData = await tokenResponseData.body.json();
    console.log(oauthData)

    const userResult = await request('https://discord.com/api/users/@me', {
      headers: {
        authorization: `Bearer ${oauthData.access_token}`,
      },
    });

    const user_info = await userResult.body.json()

    const result = await AppDataSource.getRepository(DcUser).findOneBy({
        user_id:user_info.user_id,
    })

    if (result != null){
        console.log(0)
        result.access_token = oauthData.access_token
        result.refresh_token = oauthData.refresh_token
        await AppDataSource.getRepository(DcUser).save(result)
        // Success
        await call.succ({
            user_id:result.user_id,
            time
        });
    }else{
        const dc_user = await AppDataSource.getRepository(DcUser).create()
        dc_user.user_id = user_info.id
        dc_user.access_token = oauthData.access_token
        dc_user.refresh_token = oauthData.refresh_token
        await AppDataSource.getRepository(DcUser).save(dc_user)
        // Success
        await call.succ({
            user_id:user_info.id,
            time
        });
    }

    // const user_info =  JSON.stringify(await userResult.body.json())


}
