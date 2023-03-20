import {AppDataSource} from "../data-source";
import {Guildbot} from "../entity/Guildbot";


const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');






const dc_bot_serve_start = async ()=>{
    const token = "MTA4NTIzNDUxMDY0OTYyMjU0OA.Gv0BL8.11c1KxK7CRjEtmF-IFZiVDfUjFHUGnYlRt6HWE"

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });


    // client.once(Events.ClientReady, (c: { user: { tag: any; }; }) => {
    //     console.log(`Ready! Logged in as ${c.user.tag}`);
    // });
    //
    // let guild_id = ''
    // client.on(Events.GuildCreate,async (interaction: { id: string , guild :any})=>{
    //     const guildID = interaction.id;
    //     console.log(`New guild joined: ${guildID}`);
    // })
    //
    // client.on('ready', () => {
    //     // 获取你的服务器
    //     const guild = client.guilds.cache.get('YOUR_SERVER_ID');
    //     // 获取身份组规则
    //     guild.roles.cache.fetch()
    //         .then((roles: any) => {
    //             console.log(roles);
    //         })
    //         .catch(console.error);
    // });


    // client.on(Events.GuildCreate,async (interaction: { id: string , guild :any})=>{
    //     const guildID = interaction.id;
    //     console.log(`New guild joined: ${guildID}`);
    //     console.log(await interaction.guild.roles.fetch())
    //
    //     // const guild = client.guilds.cache.get(guildID);
    //     // const permissions = guild.me.permissions;
    //     // const results = await AppDataSource.getRepository(Guildbot).findOneBy({
    //     //     guild_id:guildID,
    //     //     permissions
    //     // })
    //     // if (results != undefined){
    //     //     console.log("same guild")
    //     // }else{
    //     //     const user = AppDataSource.getRepository(Guildbot).create()
    //     //     user.guild_id = guildID
    //     //     user.permissions = permissions
    //     //     await AppDataSource.getRepository(Guildbot).save(user)
    //     // }
    // })


    // client.on(Events.GuildDelete,async (interaction: { id: string; })=>{
    //     const guildID = interaction.id;
    //     console.log(`New guild joined: ${guildID}`);
    //     const guild = client.guilds.cache.get(guildID);
    //     const permissions = guild.me.permissions;
    //     const results = await AppDataSource.getRepository(Guildbot).findOneBy({
    //         guild_id:guildID,
    //         permissions
    //     })
    //     if (results != undefined){
    //         console.log("same guild")
    //     }else{
    //         const user = AppDataSource.getRepository(Guildbot).create()
    //         user.guild_id = guildID
    //         user.permissions = permissions
    //         await AppDataSource.getRepository(Guildbot).remove(user)
    //     }
    // })


// Log in to Discord with your client's token
    await client.login(token);
    // await client.login(token);

    // console.log(client.rest.cdn.icon('1080420505946947604'))
    // const guild = await client.guilds.fetch("1080420505946947604")
    // console.log(await guild.roles.fetch())
}

export default dc_bot_serve_start
