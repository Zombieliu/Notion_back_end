import { ApiCall } from "tsrpc";
import {request} from "undici";
import {ReqGetDcUserGuilds, ResGetDcUserGuilds} from "../../../shared/protocols/v1/User/PtlGetDcUserGuilds";

export default async function (call: ApiCall<ReqGetDcUserGuilds, ResGetDcUserGuilds>) {
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
    const userGuildResult = await request('https://discord.com/api/users/@me/guilds', {
      headers: {
        authorization: `${oauthData.token_type} ${oauthData.access_token}`,
      },
    });
    const guilds = await userGuildResult.body.json()
    console.log(guilds)
    // let guild_infos = {}
    // for (let i = 0; i < guilds.length; i++) {
    //   if (guilds[i].id == call.req.guild_id) {
    //     guild_infos = guilds[i]
    //   }
    // }
    //
    // const guild_info = JSON.stringify(guild_infos)

    // Success
    await call.succ({
        guild_infos:"1",
        time
    });
}
