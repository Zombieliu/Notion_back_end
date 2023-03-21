// import { ApiCall } from "tsrpc";
// import {request} from "undici";
// import {ReqGetDcUserAllGuilds, ResGetDcUserAllGuilds} from "../../../shared/protocols/v1/User/PtlGetDcUserAllGuilds";
// import {AppDataSource} from "../../../data-source";
// import {Guildbot} from "../../../entity/Guildbot";
// import {In} from "typeorm";
//
// export default async function (call: ApiCall<ReqGetDcUserAllGuilds, ResGetDcUserAllGuilds>) {
//     // Error
//     if (call.req.code === '') {
//         await call.error('tx_hash is empty');
//         return;
//     }
//
//     let time = new Date();
//     const port = 3000
//     const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
//         method: 'POST',
//         body: new URLSearchParams({
//             client_id: '1085234510649622548',
//             client_secret: 'HKGaABLMhZ03pLTF7-ADMIedn0isWSdz',
//             code: call.req.code,
//             grant_type: 'authorization_code',
//             redirect_uri: `http://localhost:${port}/dashboard`,
//             scope: 'identify guilds',
//         }).toString(),
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//     });
//     const oauthData = await tokenResponseData.body.json();
//     console.log(oauthData)
//     const userGuildResult = await request('https://discord.com/api/users/@me/guilds', {
//         headers: {
//             authorization: `${oauthData.token_type} ${oauthData.access_token}`,
//         },
//     });
//     const guilds = await userGuildResult.body.json()
//
//     let guild_id_list = []
//     for (let i=0;i<guilds.length;i++){
//         const result = await AppDataSource.getRepository(Guildbot).findOneBy({
//             guild_id:guilds[i].id,
//         })
//         if (result != null){
//             guild_id_list.push(guilds[i])
//         }
//     }
//
//     // Success
//     await call.succ({
//         guild_id_list: JSON.stringify(guild_id_list),
//         time
//     });
// }
