import {AppDataSource} from "../data-source";
import {Guildbot} from "../entity/Guildbot";
import deploy_commands from "./deploy-commands";
import {ValidationRules} from "../entity/ValidationRules";
import {ValidationRulesUser} from "../entity/ValidationRulesUser";
const { token } = require('../../config.json');

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');


const dc_bot_serve_start = async ()=>{
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    await client.login(token);

    client.once(Events.ClientReady, (c: { user: { tag: any; }; }) => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
    });

    client.on(Events.GuildCreate,async (interaction: { id: string , guild :any})=>{
        const guildID = interaction.id;
        console.log(`New guild joined: ${guildID}`);
        const results = await AppDataSource.getRepository(Guildbot).findOneBy({
            guild_id:guildID,
        })
        await deploy_commands(guildID);
        if (results != null){
            console.log("same guild")
        }else{
            const user = AppDataSource.getRepository(Guildbot).create()
            user.guild_id = guildID
            await AppDataSource.getRepository(Guildbot).insert(user)
        }
    })


    client.on(Events.GuildDelete,async (interaction: { id: string; })=>{
        const guildID = interaction.id;
        console.log(`New guild joined: ${guildID}`);
        const results = await AppDataSource.getRepository(Guildbot).findOneBy({
            guild_id:guildID,
        })
        if (results != null){
            await AppDataSource.getRepository(Guildbot).remove(results)
            const validation_result = await AppDataSource.getRepository(ValidationRules).findBy({
                guild_id:guildID,
            })
            let null_array:  ValidationRules[] = []
            if (validation_result != null_array){
                await AppDataSource.getRepository(ValidationRules).remove(validation_result)
                const validation_result_user= await AppDataSource.getRepository(ValidationRulesUser).findBy({
                    guild_id:guildID,
                })
                let null_array:  ValidationRulesUser[] = []
                if (validation_result_user != null_array){
                    await AppDataSource.getRepository(ValidationRulesUser).remove(validation_result_user)
                }
            }
        }else{
            console.log("no")
        }
    })

    client.on(Events.InteractionCreate, async (interaction: { isChatInputCommand: () => any; commandName: any; replied: any; deferred: any; followUp: (arg0: { content: string; ephemeral: boolean; }) => any; reply: (arg0: { content: string; ephemeral: boolean; }) => any; }) => {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    });

// Log in to Discord with your client's token

    // await client.login(token);

    // console.log(client.rest.cdn.icon('1080420505946947604'))
    // const guild = await client.guilds.fetch("1080420505946947604")
    // console.log(await guild.roles.fetch())


    // set command
    client.commands = new Collection();
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        client.commands.set(command.data.name, command);
    }
}

export default dc_bot_serve_start
