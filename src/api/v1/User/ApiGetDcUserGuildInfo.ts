import { ApiCall } from "tsrpc";
import {request} from "undici";
import {ReqGetDcUserGuildInfo, ResGetDcUserGuildInfo} from "../../../shared/protocols/v1/User/PtlGetDcUserGuildInfo";

export default async function (call: ApiCall<ReqGetDcUserGuildInfo, ResGetDcUserGuildInfo>) {
    // Error
    if (call.req.guild_id === '') {
        await call.error('tx_hash is empty');
        return;
    }

    let time = new Date();

    const bot_token = 'MTA4NTIzNDUxMDY0OTYyMjU0OA.Gv0BL8.11c1KxK7CRjEtmF-IFZiVDfUjFHUGnYlRt6HWE'
    const userGuildResult = await request(`https://discord.com/api/guilds/${call.req.guild_id}`, {
      headers: {
        authorization: `Bot ${bot_token}`,
      },
    });
    const guild_info = JSON.stringify(await userGuildResult.body.json())


    // Success
    await call.succ({
        guild_info,
        time
    });
}
