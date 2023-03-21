// This is a demo code file
// Feel free to delete it

/**
 * 增加数据
 * 此处的注释将会自动附带到生成的 API 文档中
 */
export interface ReqAddRule {
    /** 要增加的消息内容 */
    guild_id:string
    role_id:string
    description: string;
    chain_type: string;
    token_type: string;
    smart_contract_address: string;
    min_token_amount: string;
    max_token_amount: string;
}

export interface ResAddRule {
    /** 服务端内容创建时间 */
    time: Date
}
