// This is a demo code file
// Feel free to delete it

/**
 * 增加数据
 * 此处的注释将会自动附带到生成的 API 文档中
 */
export interface ReqGetDcUserInfo {
    /** 要增加的消息内容 */
    code:string
}

export interface ResGetDcUserInfo {
    /** 服务端内容创建时间 */
    user_info:string
    time: Date
}
