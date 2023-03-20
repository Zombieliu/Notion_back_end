import { ServiceProto } from 'tsrpc-proto';
import { ReqGetDcUserGuildInfo, ResGetDcUserGuildInfo } from './v1/User/PtlGetDcUserGuildInfo';
import { ReqGetDcUserGuilds, ResGetDcUserGuilds } from './v1/User/PtlGetDcUserGuilds';
import { ReqGetDcUserInfo, ResGetDcUserInfo } from './v1/User/PtlGetDcUserInfo';

export interface ServiceType {
    api: {
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
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 3,
    "services": [
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
        }
    ],
    "types": {
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
                    "id": 0,
                    "name": "code",
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
        }
    }
};