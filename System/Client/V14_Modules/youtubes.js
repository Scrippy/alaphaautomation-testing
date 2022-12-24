const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('youtubes')
        .setDescription('Gives links to the Alaphan youtubes.'),
    subdata: {
        cooldown: 3
    },
	async execute(interaction) {
		const time = new Date()
        const embedAA = {
                "author": {
                    "name": interaction.client.user.username,
                    "icon_url": interaction.client.user.displayAvatarURL({ format: "png", dynamic: true })
                },
                color: 0x0099ff,
                "footer": {
                    "text": interaction.guild.name,
                    "icon_url": interaction.guild.iconURL({ format: "png", dynamic: true })
                },
                "description": `\`\`Alpha Authority / OffficialRBXAA\`\`\nhttps://youtube.com/@AARBX`,
                timestamp: new Date()
        }
		await interaction.reply({ embeds: [ embedAA ] });
    }
};