import {SlashCommandBuilder}  from 'discord.js'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: { guild: { roles: { fetch: () => any; }; }; reply: (arg0: string) => any; }) {
        // console.log(await interaction.guild.roles.fetch())
        // await  interaction.guild.roles.fetch
        // await interaction.member.roles.add("1080420505946947608")
        // let role = interaction.guild.roles.find("name","💧 | Mod")
        // await interaction.member.addRole(role.id)
        // await interaction.channel.addRole("1080420505946947608")
        await interaction.reply('Pong!');
    },
};

