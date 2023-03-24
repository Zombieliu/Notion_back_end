const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config()


// and deploy your commands!
const deploy_commands = async (guild_id:string) => {
    const commands: any[] = [];
// Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }
    
// Construct and prepare an instance of the REST module
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    console.log(process.env.CLIENTID)
    console.log("111111111111111111111",commands)
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENTID, guild_id),
            { body: commands },
        )
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
};

export default deploy_commands
