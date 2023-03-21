// This is a demo code file
// Feel free to delete it

/**
 * 增加数据
 * 此处的注释将会自动附带到生成的 API 文档中
 */
export interface ReqGetDcUserAllGuilds {
    /** 要增加的消息内容 */
    user_id:string
}

export interface ResGetDcUserAllGuilds {
    /** 服务端内容创建时间 */
    guild_id_list:string
    time: Date
}
