// import { ApiCall } from "tsrpc";
// import {ReqAddRule, ResAddRule} from "../../../shared/protocols/v1/Rules/PtlAddRule";
// import {AppDataSource} from "../../../data-source";
// import {Guildbot} from "../../../entity/Guildbot";
//
//
// export default async function (call: ApiCall<ReqAddRule, ResAddRule>) {
//     // Error
//     if (call.req.guild_id === '') {
//         await call.error('guild_id is empty');
//         return;
//     }
//
//     const result = await AppDataSource.getRepository(Guildbot).findOneBy({
//         guild_id:guilds[i].id,
//     })
//
//
//     // Success
//     await call.succ({
//         guild_id_list: JSON.stringify(guild_id_list),
//         time
//     });
// }
