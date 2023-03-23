import { ActionRowBuilder, ButtonBuilder, ButtonStyle,SlashCommandBuilder,EmbedBuilder} from 'discord.js'
import {AppDataSource} from "../../data-source";
import {ValidationRules} from "../../entity/ValidationRules";
import {ValidationRulesUser} from "../../entity/ValidationRulesUser";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('verify your token!'),
    async execute(interaction: { guild:any, user: { id: any; }; guildId: any; reply: (arg0: { content: string; ephemeral: boolean; embeds: any[]; components: any[]; }) => any; }) {
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        // .setCustomId('primary')
                        .setLabel('Click me!')
                        .setStyle(ButtonStyle.Link)
                        .setURL(`http://localhost:3000/verify/${interaction.guildId}/${interaction.user.id}`)
                );
            // ${interaction.user.id}
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Some title')
                .setURL('https://discord.js.org')
                .setDescription('Some description here');
            await interaction.reply({ content: 'I think you should,', ephemeral: true, embeds: [embed], components: [row] });
        // setTimeout(async()=>{
        //     const validation_user_result = await AppDataSource.getRepository(ValidationRulesUser).findBy({
        //         user_id:`${interaction.user.id}`
        //
        //     })
        //     const member = await interaction.guild.members.fetch(interaction.user.id);
        //     if (validation_user_result != null){
        //         for (let i = 0; i < validation_user_result.length;i++){
        //             await member.roles.add(validation_user_result[i].role_id)
        //             console.log(`success add ${validation_user_result[i].role_id}`)
        //         }
        //     }
        // },1000 * 60 * 5)





    },
};
