import { ApiCall } from "tsrpc";
import {AppDataSource} from "../../../data-source";
import {ValidationRules} from "../../../entity/ValidationRules";
import {ReqDelRule, ResDelRule} from "../../../shared/protocols/v1/Rules/PtlDelRule";


export default async function (call: ApiCall<ReqDelRule, ResDelRule>) {
    // Error
    if (call.req.guild_id === '') {
        await call.error('guild_id is empty');
        return;
    }

    let time = new Date();

    const last_rules = await AppDataSource.getRepository(ValidationRules).findOneBy(
        {
            guild_id:call.req.guild_id,
            role_id:call.req.role_id
        }
    )
    if (last_rules != null){
        await AppDataSource.getRepository(ValidationRules).remove(last_rules)
        await call.succ({
            time
        });
    }else{
        await call.error('empty');
        return;
    }
}
