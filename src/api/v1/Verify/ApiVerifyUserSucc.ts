import { ApiCall } from "tsrpc";
import {ReqVerifyUserSucc, ResVerifyUserSucc} from "../../../shared/protocols/v1/Verify/PtlVerifyUserSucc";
import {AppDataSource} from "../../../data-source";
import {ValidationRulesUser} from "../../../entity/ValidationRulesUser";


export default async function (call: ApiCall<ReqVerifyUserSucc, ResVerifyUserSucc>) {
    // Error
    if (call.req.guild_id === '') {
        await call.error('guild_id is empty');
        return;
    }

    let time = new Date();
    const result = await AppDataSource.getRepository(ValidationRulesUser).findBy(
        {
            user_id:call.req.user_id
        }
    )
    if (result != null){
        console.log("2")
        await call.succ({
            time
        });
    }else{
        console.log("1")
        const user = await AppDataSource.getRepository(ValidationRulesUser).create()
        user.guild_id = call.req.guild_id
        user.role_id = call.req.role_id
        user.user_id = call.req.user_id
        await AppDataSource.getRepository(ValidationRulesUser).insert(user)
        await call.succ({
            time
        });
    }
}
