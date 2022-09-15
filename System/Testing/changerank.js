require('dotenv').config()
const axios = require('axios');
const admin = require("firebase-admin");
const Discord = require('discord.js')

module.exports = {
	name: 'changerank',
	description: `Change a player's rank on the Alpha Authority Roblox group.`,
    args: true,
    usage: '<rank id> <player name>',
    guildOnly: true,
	execute(message, args, noblox, client, admin) {
        var db = admin.database();

        // Auxiliary Opensource Test
        if (message.channel.type === "dm") return message.channel.send(`That command can't be used through direct messages!`)
        
    	if (message.author.id == "170639211182030850" || message.author.id == "463516784578789376"){
            isAuthorized()
        }else{
    		return message.channel.send(`Sorry ${message.author}, but only the owners can run that command!`).then(message => message.delete({timeout: 5000, reason: "delete"}));
    	}
        
        function isAuthorized(){
        var flag = true;

        // make sure number is a number and is between the specified numberss
        console.log(args[0], args[1])
    	if (!args[0] || isNaN(Number(args[0])) || Number(args[0]) < 1){ // || Number(args[1]) > client.config.max_experiencePoints){
    		var badEmbed = new Discord.MessageEmbed()
    			.setColor(0xf54242)
    			.setDescription(`You must specify a rank id for me to change the Player's rank to`)
    		return message.reply(badEmbed);
    	};
    
    	// if no usernames present, error!
    	if (!args[1]){
    		var badEmbed = new Discord.MessageEmbed()
    			.setColor(0xf54242)
    			.setDescription(`Please provide the ROBLOX username that you want to their change rank for!`)
    		return message.reply(badEmbed);
    	};
    
    	// collect usernames into an array
        const arrayFinder  = function (a) {
            if (a.indexOf(' ') != -1) {
                return a.split(' ')

            }else{
                return a
            }
        };
        let userArray = arrayFinder(message.content.slice(process.env.PREFIX.length + 11 + args[0].length))
    	
    	// remove duplicates
    	//userArray = Array.from(new Set(userArray));
    
    	// number variable
    	var rankid = Number(args[0]);
        console.log(rankid)
    
    	// tell user that we're still working on command..
    	var workinEmbed = new Discord.MessageEmbed()
    		.setDescription(`Working on updating user(s)...`)
    
    	message.channel.send(workinEmbed).then(message => message.delete({ timeout: userArray.length * 1000 + 1000, reason: "delete working message" }));
    
    
    	// all roles
    	//var roles;
    	//await axios.get(`https://api.roblox.com/groups/${groupID}`)
    	//	.then(function (response) {
    	//		roles = response.data.Roles;
    	//	});
    
    	// for loop to go through array
    	for (let i = 0; i < userArray.length; i++) {
          setTimeout(function timer() {
            console.log(userArray[i])
            //function sleep (time) {
            //  return new Promise((resolve) => setTimeout(resolve, time));
            //}

// Usage!    function sleepFor(sleepDuration){
        
            //sleep(1000).then(() => {
    // Do something after the sleep!
    		// username & id & boolean to get out
        	var rblx_username = userArray[i];
            //var rblx_username = args[1]
            var rblx_id;
            //var flag = false;
            //var blacklisted = false;
    
                // grab id if possible
            var usernameParam = {
                "usernames": [
                    rblx_username
                ],
                "excludeBannedUsers": true
            }
            axios.post(`https://users.roblox.com/v1/usernames/users`, usernameParam)
                .then(function (response){
                    // wow user doesn't exist
                    console.log(response.data)
                    if (response.data.data.length == 0){
                        //flag = true;
                        var badEmbed = new Discord.MessageEmbed()
                            .setColor(0xf54242)
                            .setDescription(`User **${rblx_username}** doesn't exist!`)
                        console.log(badEmbed)
                        return message.channel.send(badEmbed);
                    }else{
                        // user does exist
                        rblx_username = response.data.data[0].name;
                        rblx_id = response.data.data[0].id;
                        
    
    
                        //axios.get(`https://alapha-c7845-default-rtdb.firebaseio.com/points/users/${rblx_id}.json`)
                        noblox.setRank(790907, rblx_id, Number(rankid))
                            .then(function (response) {
                                console.log(response)
                                if (!response.name){
                                    flagit(true, response);
                                }else{
                                    flagit(false, response);
                                }
                            })
                        }
                        // new total points added together
                        function flagit(flag, response){
                            
                        
                            if (flag){//&& blacklisted != true){
                                // embed message to channel
                                var doneEmbed = new Discord.MessageEmbed()
                                    .setColor(FF0000)
                                    .setDescription(`Failed to update ${rblx_username}'s rank!`)
                                message.channel.send(doneEmbed)
                    
                            }else{
                                // embed message to channel
                                var doneEmbed = new Discord.MessageEmbed()
                                    .setColor(0x28F6FF)
                                    .setDescription(`Updated ${rblx_username}'s rank! New rank: ${response.name}`)
                                message.channel.send(doneEmbed)
                                
                            }    
                        }
                    
                    })
                    // error message
                    console.log(flag)
                    //if (flag){
                    //	var badEmbed = new Discord.MessageEmbed()
                    //		.setColor(0xf54242)
                    //		.setDescription('Test')//`User **${rblx_username}** doesn't exist!`)
                    //    console.log(badEmbed)
                    //	message.channel.send(badEmbed);
                    //	continue;
                    //};
                    //checks if a user is blacklisted. Cannot give blacklisted individuals experience now.
                    //axios.get(`https://alapha-c7845-default-rtdb.firebaseio.com/guilds/${message.guild.id}/blacklist/${rblx_id}.json`)
                    //	.then(function (response) {
                    //		if (response.data != null){
                    //			blacklisted = true
                    //			var badEmbed = new Discord.MessageEmbed()
                    //			.setColor(0xf54242)
                    //			.setDescription(`User **${rblx_username}** is blacklisted!`)
                    //			(message.channel.send(badEmbed));
                    //		}
                    //	})
                    // get total points so far from profile
          }, i * 1000);
        }
                     
              setTimeout(function timer() {
                 message.channel.send(`Updated everyone's profile!`);
              }, userArray.length * 1000 + 1000);
        }
    }
}