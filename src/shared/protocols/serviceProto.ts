import { ServiceProto } from 'tsrpc-proto';
import { ReqGetDcUserInfo, ResGetDcUserInfo } from './PtlGetDcUserInfo';

export interface ServiceType {
    api: {
        "GetDcUserInfo": {
            req: ReqGetDcUserInfo,
            res: ResGetDcUserInfo
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "services": [
        {
            "id": 0,
            "name": "GetDcUserInfo",
            "type": "api"
        }
    ],
    "types": {
        "PtlGetDcUserInfo/ReqGetDcUserInfo": {
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
        "PtlGetDcUserInfo/ResGetDcUserInfo": {
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