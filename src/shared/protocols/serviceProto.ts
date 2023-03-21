import { ServiceProto } from 'tsrpc-proto';
import { ReqAddRule, ResAddRule } from './v1/Rules/PtlAddRule';
import { ReqGetRule, ResGetRule } from './v1/Rules/PtlGetRule';
import { ReqGetDcUserAllGuilds, ResGetDcUserAllGuilds } from './v1/User/PtlGetDcUserAllGuilds';
import { ReqGetDcUserGuildInfo, ResGetDcUserGuildInfo } from './v1/User/PtlGetDcUserGuildInfo';
import { ReqGetDcUserGuilds, ResGetDcUserGuilds } from './v1/User/PtlGetDcUserGuilds';
import { ReqGetDcUserInfo, ResGetDcUserInfo } from './v1/User/PtlGetDcUserInfo';
import { ReqGetDcUserToken, ResGetDcUserToken } from './v1/User/PtlGetDcUserToken';

export interface ServiceType {
    api: {
        "v1/Rules/AddRule": {
            req: ReqAddRule,
            res: ResAddRule
        },
        "v1/Rules/GetRule": {
            req: ReqGetRule,
            res: ResGetRule
        },
        "v1/User/GetDcUserAllGuilds": {
            req: ReqGetDcUserAllGuilds,
            res: ResGetDcUserAllGuilds
        },
        "v1/User/GetDcUserGuildInfo": {
            req: ReqGetDcUserGuildInfo,
            res: ResGetDcUserGuildInfo
        },
        "v1/User/GetDcUserGuilds": {
            req: ReqGetDcUserGuilds,
            res: ResGetDcUserGuilds
        },
        "v1/User/GetDcUserInfo": {
            req: ReqGetDcUserInfo,
            res: ResGetDcUserInfo
        },
        "v1/User/GetDcUserToken": {
            req: ReqGetDcUserToken,
            res: ResGetDcUserToken
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 5,
    "services": [
        {
            "id": 6,
            "name": "v1/Rules/AddRule",
            "type": "api"
        },
        {
            "id": 7,
            "name": "v1/Rules/GetRule",
            "type": "api"
        },
        {
            "id": 5,
            "name": "v1/User/GetDcUserAllGuilds",
            "type": "api"
        },
        {
            "id": 4,
            "name": "v1/User/GetDcUserGuildInfo",
            "type": "api"
        },
        {
            "id": 3,
            "name": "v1/User/GetDcUserGuilds",
            "type": "api"
        },
        {
            "id": 2,
            "name": "v1/User/GetDcUserInfo",
            "type": "api"
        },
        {
            "id": 8,
            "name": "v1/User/GetDcUserToken",
            "type": "api"
        }
    ],
    "types": {
        "v1/Rules/PtlAddRule/ReqAddRule": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "guild_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "role_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 2,
                    "name": "description",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 3,
                    "name": "chain_type",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 4,
                    "name": "token_type",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 5,
                    "name": "smart_contract_address",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 6,
                    "name": "min_token_amount",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 7,
                    "name": "max_token_amount",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/Rules/PtlAddRule/ResAddRule": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/Rules/PtlGetRule/ReqGetRule": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "guild_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "role_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/Rules/PtlGetRule/ResGetRule": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "rule",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/User/PtlGetDcUserAllGuilds/ReqGetDcUserAllGuilds": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "user_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/User/PtlGetDcUserAllGuilds/ResGetDcUserAllGuilds": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "guild_id_list",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/User/PtlGetDcUserGuildInfo/ReqGetDcUserGuildInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "guild_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/User/PtlGetDcUserGuildInfo/ResGetDcUserGuildInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "guild_info",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/User/PtlGetDcUserGuilds/ReqGetDcUserGuilds": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "code",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/User/PtlGetDcUserGuilds/ResGetDcUserGuilds": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "guild_infos",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/User/PtlGetDcUserInfo/ReqGetDcUserInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 1,
                    "name": "user_id",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/User/PtlGetDcUserInfo/ResGetDcUserInfo": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user_info",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        },
        "v1/User/PtlGetDcUserToken/ReqGetDcUserToken": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "code",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "v1/User/PtlGetDcUserToken/ResGetDcUserToken": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "user_id",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "time",
                    "type": {
                        "type": "Date"
                    }
                }
            ]
        }
    }
};