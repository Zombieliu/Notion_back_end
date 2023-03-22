import { ApiCall } from "tsrpc";
import {ReqAddRule, ResAddRule} from "../../../shared/protocols/v1/Rules/PtlAddRule";
import {AppDataSource} from "../../../data-source";
import {ValidationRules} from "../../../entity/ValidationRules";


export default async function (call: ApiCall<ReqAddRule, ResAddRule>) {
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
        last_rules.description = call.req.description;
        last_rules.chain_type = call.req.chain_type;
        last_rules.token_type = call.req.token_type;
        last_rules.smart_contract_address = call.req.smart_contract_address;
        last_rules.min_token_amount = call.req.min_token_amount;
        last_rules.max_token_amount = call.req.max_token_amount;
        const result = await AppDataSource.getRepository(ValidationRules).save(last_rules)
        if (result){
            // Success
            await call.succ({
                time
            });
        }else {
            // error
            await call.error('empty');
            return;
        }
    }else{
        const rules = await AppDataSource.getRepository(ValidationRules).create()
        rules.guild_id = call.req.guild_id;
        rules.role_id = call.req.role_id;
        rules.description = call.req.description;
        rules.chain_type = call.req.chain_type;
        rules.token_type = call.req.token_type;
        rules.smart_contract_address = call.req.smart_contract_address;
        rules.min_token_amount = call.req.min_token_amount;
        rules.max_token_amount = call.req.max_token_amount;
        const result = await AppDataSource.getRepository(ValidationRules).insert(rules)
        if (result){
            // Success
            await call.succ({
                time
            });
        }else {
            // error
            await call.error('empty');
            return;
        }
    }




}
