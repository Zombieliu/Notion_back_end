import { ApiCall } from "tsrpc";
import {request} from "undici";
import {ReqGetDcUserInfo, ResGetDcUserInfo} from "../shared/protocols/PtlGetDcUserInfo";

export default async function (call: ApiCall<ReqGetDcUserInfo, ResGetDcUserInfo>) {
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
        client_secret: 'P2p8dg3Q10K07w7vYaoNbzwjp_xEb0OT',
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
    const userResult = await request('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${oauthData.token_type} ${oauthData.access_token}`,
      },
    });
    const user_info =  JSON.stringify(await userResult.body.json())

    // Success
    await call.succ({
        user_info,
        time
    });
}
