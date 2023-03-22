import { ActionRowBuilder, ButtonBuilder, ButtonStyle,SlashCommandBuilder,EmbedBuilder} from 'discord.js'
import {AppDataSource} from "../../data-source";
import {ValidationRules} from "../../entity/ValidationRules";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('verify your token!'),
    async execute(interaction: { user: { id: any; }; guildId: any; reply: (arg0: { content: string; ephemeral: boolean; embeds: any[]; components: any[]; }) => any; }) {
        const rule_list = JSON.stringify(await AppDataSource.getRepository(ValidationRules).findBy(
            {
                guild_id:interaction.guildId
            }
        ))
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    // .setCustomId('primary')
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Link)
                    .setURL(`http://localhost:3000/verify/${interaction.guildId}/${interaction.user.id}/${rule_list}`)
            );
        // ${interaction.user.id}
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Some title')
            .setURL('https://discord.js.org')
            .setDescription('Some description here');

        await interaction.reply({ content: 'I think you should,', ephemeral: true, embeds: [embed], components: [row] });
    },
};
