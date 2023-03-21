import { ApiCall } from "tsrpc";
import {ReqGetRule, ResGetRule} from "../../../shared/protocols/v1/Rules/PtlGetRule";
import {AppDataSource} from "../../../data-source";
import {ValidationRules} from "../../../entity/ValidationRules";


export default async function (call: ApiCall<ReqGetRule, ResGetRule>) {
    // Error
    if (call.req.guild_id === '') {
        await call.error('tx_hash is empty');
        return;
    }

    let time = new Date();


    const rule = await AppDataSource.getRepository(ValidationRules).findOneBy(
        {
            guild_id:call.req.guild_id,
            role_id:call.req.role_id
        }
    )

    if (rule != null){
        // Success
        await call.succ({
            rule:JSON.stringify(rule),
            time
        });
    }else{
        await call.error('empty');
        return;
    }

}
