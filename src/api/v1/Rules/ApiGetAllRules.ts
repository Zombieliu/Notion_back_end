import { ApiCall } from "tsrpc";

import {AppDataSource} from "../../../data-source";
import {ValidationRules} from "../../../entity/ValidationRules";
import {ReqGetAllRules, ResGetAllRules} from "../../../shared/protocols/v1/Rules/PtlGetAllRules";


export default async function (call: ApiCall<ReqGetAllRules, ResGetAllRules>) {
    // Error
    if (call.req.guild_id === '') {
        await call.error('tx_hash is empty');
        return;
    }

    let time = new Date();


    const rule = await AppDataSource.getRepository(ValidationRules).findBy(
        {
            guild_id:call.req.guild_id,
        }
    )
    if (rule.length != 0){
        // Success
        await call.succ({
            rule_list:JSON.stringify(rule),
            time
        });
    }else{
        await call.error('empty');
        return;
    }

}
