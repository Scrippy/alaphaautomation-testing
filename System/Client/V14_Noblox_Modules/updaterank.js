require('dotenv').config()
const axios = require("axios");
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout
const { query } = require('express');
const admin = require("firebase-admin");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('updateranks')
        .setDescription(`View a user's group profile. V2`)
        .addStringOption(option =>
            option.setName('username')
                .setDescription(`View a user's group profile. V2`)
                .setRequired(false)),
	async execute(interaction, noblox) {
        if (interaction.user.id == "170639211182030850" || interaction.user.id == "463516784578789376"){
            isAuthorized()
        }else{
    		return interaction.reply({ content: `Sorry ${message.author}, but only the owners can run that command!` }).then(message => message.delete({timeout: 5000, reason: "delete"}));
    	}
        
        function isAuthorized(){
            var db = admin.database();
            const userdata = []
            var ref = db.ref('points').child('groups').child('Alpha Authority').child('users')
            ref.once('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    setTimeout(function timer() {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        console.log(childKey, childData)
                        const rankId = noblox.getRankInGroup(790907, Number(childKey))
                        console.log(rankId)
                        if (rankId == (2 || 91 || 92 || 93 || 94 || 95 || 96 || 97)) {
                            console.log(childKey, rankId)
                        }
                    // ...

                    }, 500);
                });
            });
        }
    }
}