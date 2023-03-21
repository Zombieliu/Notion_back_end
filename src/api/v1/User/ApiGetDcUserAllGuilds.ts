import { ApiCall } from "tsrpc";
import {request} from "undici";
import {ReqGetDcUserAllGuilds, ResGetDcUserAllGuilds} from "../../../shared/protocols/v1/User/PtlGetDcUserAllGuilds";
import {AppDataSource} from "../../../data-source";
import {Guildbot} from "../../../entity/Guildbot";
import {DcUser} from "../../../entity/DcUser";

export default async function (call: ApiCall<ReqGetDcUserAllGuilds, ResGetDcUserAllGuilds>) {
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
        const userGuildResult = await request('https://discord.com/api/users/@me/guilds', {
            headers: {
                authorization: `Bearer ${result.access_token}`,
            },
        });
        const guilds = await userGuildResult.body.json()
        let guild_id_list = []
        for (let i=0;i<guilds.length;i++){
            const result = await AppDataSource.getRepository(Guildbot).findOneBy({
                guild_id:guilds[i].id,
            })
            if (result != null){
                guild_id_list.push(guilds[i])
            }
        }
        // Success
        await call.succ({
            guild_id_list: JSON.stringify(guild_id_list),
            time
        });
    }else{
        await call.error('empty');
        return;
    }

}
