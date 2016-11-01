//jshint esversion: 6
var Discord = require("discord.js");
var bot = new Discord.Client();
var chatlog = true;
var maintenance = false;
var gregid = "192571625885925376";
var botid = "230125228414468096";
var staffroles = ["204313198256455691", "226466022297698306"];
var tankCommands = [";TANKBASIC", ";TANKTWIN", ";SOMETANKTEST"];
var tankDescript = [
    "https://cdn.discordapp.com/attachments/226287186255937536/230086729640574976/650.png\n**`TANK`** `[Normal Type]`\n\n**`ABILITIES`**\n*`Run Away - Enables a sure getaway.`*\n\n**`STATS`**\n**`HP`** `45`\n**`ATTACK`** `45`\n**`DEFENSE`** `45`\n**`SP. ATTACK`** `45`\n**`SP. DEFENSE`** `45`\n**`SPEED`** `45`\n\n**`EVOLUTIONS`**\n**Twin** `Twin Bullets`\n**Sniper** `Snipe`\n**Machine Gun** `Machine Bullets`\n**Flank Guard** `Flank Shot`\n**Smasher** `Smash`",
    "https://cdn.discordapp.com/attachments/226287186255937536/230089116581232651/651.png\n**`TWIN`** `[Normal Type]`\n\n**`ABILITIES`**\n*`Tinted Lens - Power of moves is doubled else if it is not very effective.`*\n\n**`STATS`**\n**`HP`** `45`\n**`ATTACK`** `45`\n**`DEFENSE`** `45`\n**`SP. ATTACK`** `45`\n**`SP. DEFENSE`** `45`\n**`SPEED`** `45`\n\n**`EVOLUTIONS`**\n**Triple shot** `Tri shot`\n**Quad Tank** `Quad Bullets`\n**Machine Gun** `Machine Bullets`\n**Twin Flank** `Twin Flank Shot`\n",
    "dis is placeholder"
];
var stafflist = ["192571625885925376", "186730180872634368", "180813971853410305"];
bot.on("debug", console.log);
bot.on("warn", console.log);
bot.on("ready", function () {
    bot.setPlayingGame("Try ;help :)");
});
bot.on('message', message => {
    if (message.server == "DiepmonBot's Fortress" && message.author.id != botid && message.channel.name != "diepmonbot-logs") {
        bot.sendMessage("239341522703745024", "```diff\n! (" + message.channel.name + ") " + message.author.username + ": " + message.content + "\n```");
    } else if (message.server == "Diepmon" && message.author.id != botid && message.channel.name != "chat-logs") {
        bot.sendMessage("240438155184963584", "```diff\n+ (" + message.channel.name + ") " + message.author.username + ": " + message.content + "\n```");
    }
    /*if (message && message.server && message.server.roles) {
        var tmp = message.server.roles.get("name", "Staff");
        if (!tmp && (staffroles.indexOf(tmp) === -1 || staffroles.length != 0)) {
            staffroles.push(tmp);
            console.log(staffroles.toString());
        }
    }*/
    //console.log(message.content.startsWith(";") ? "got command '" + message.content + "'" : "no command");
    if (maintenance && !isStaff(message.author) && message.content.startsWith(";")) {
        bot.sendMessage(message, ":no_entry_sign: This bot is in maintenance mode. :no_entry_sign:");
    } else if (message.content.startsWith(";")) {
        var input = message.content.toUpperCase();
        var hello = message.author.id;
        var themsg = message.content;
        if (chatlog) {
            if (!message.channel.name || message.channel.name === "") {
                console.log("(DMChannel) " + message.author.username + ": " + themsg);
            } else {
                console.log("(" + message.channel.name + ") " + message.author.username + ": " + themsg);
            }
        }
        if (handleTank(input, message)) { }
        else if (input === ";TANKDIR") {
            bot.sendMessage(message, "basic tank = **;tankbasic**\nTwin = **;tanktwin**");
        }
        else if (input === ";ABOUT") {
            bot.sendMessage(message, "\n**CREDITS**\n\n**greg** and **pgsuper made** this bot\n**Orca** made Diepmon\n**Lego** helped host the bot and add new commands\n**BlazingFire007** helped host the bot\n**BlaCoiso** helped with commands.\n\nThis bot was made in javascript/node. ");
        }
        else if (input === ";RIP") {
            bot.sendMessage(message, " Rip you, this command has nothing to do with diepmon, so yes, rip.");
        }
        else if (input === ";TRIVIA") {
            bot.sendMessage(message, " Ask Dex to fix his bot, I can't help you.");
        }
        else if (input === ";SPAM") {
            bot.sendMessage(message, "Rip, ur gonna get banned else if you use this command.");
        }
        else if (input === ";LYRICS") {
            bot.sendMessage(message, "```I wanna be the very best\r\nLike no tank ever was\r\nTo level them is my real test\r\nTo train them is my cause\r\nI will travel across the web\r\nFarming far and wide\r\nGetting tougher each and every step\r\nThe bullet that\'s inside\r\n\r\nDiepmon, Gotta spin to team!\r\n\r\nIt\'s you and me\r\nI know it\'s my destiny\r\nDiepmon, oh, you\'re my best friend \r\nIn an arena we must defend-\r\nDiepmon, gotta spin to team!\r\nA tank so true\r\nOur courage will pull us through\r\nYou spin to me- I\'ll team with you\r\nDiepmon, gotta spin to team!\r\nGotta Spin to team!\r\nYeah\r\n\r\nEvery [MG] along the way\r\nWith courage I will face\r\nI will battle the [RDT]s\r\nTo claim my rightful place\r\nCome with me, the time is right\r\nThere\'s no better team\r\nTank with tank we\'ll win the fight\r\nIt\'s always been our dream\r\nDiepmon, gotta spin to team\r\nIt\'s you and me\r\nI know it\'s our destiny\r\nDiepmon, oh, you\'re my best friend\r\nIn an arena we must defend\r\nDiepmon, gotta spin to team\r\nA tank so true\r\n\r\nOur courage will pull us through\r\nYou spin to me and I\'ll team with you\r\nDiepmon, Gotta spin to team!\r\n\r\nGotta spin to team!\r\nGotta spin to team!\r\n\r\nGotta spin to team!\r\n\r\n```");
        }
        else if (input === ";SANKYY") {
            bot.sendMessage(message, "Sankyy doesn't know what this command should say, so I wrote this instead.");
        }
        else if (input === ";HELP") {
            bot.sendMessage(message, "I've sent help via DM.");
            bot.sendMessage(hello, "``;tankdir`` = directory of tanks in diepmon (that\'s a work in progress)\r\n\r\n**More commands:**\r\n``;trivia``\r\n``;about``\r\n``;sankyy``\r\n``;lyrics``\r\n``;debug``\r\n``;restart``\r\n``;rip``\r\n``;daddy``\r\n``;lenny``\r\n``;nothing``\n``;nudes``\n");
        }
        else if (input === ";DEBUG") {
            bot.sendMessage(message, "kek");
        }
        else if (input === ";LENNY") {
            bot.sendMessage(message, "( ͡° ͜ʖ ͡°)");
        }
        else if (input === ";TINH1000000") {
            bot.sendMessage(message, "I dunno, this command is useless");
        }
        else if (input === ";FINISHRESTART") {
            bot.sendMessage(message, "kek");
        }
        else if (input === ";DADDY") {
            bot.sendMessage(message, "Daddy Dwayne? https://giphy.com/gifs/fits-AjkKC77JZVCEg");
        }
        else if (input === ";NOTHING") {
            bot.sendMessage(message, "```nothing\r\n\r\n\r\n\r\n\r\n```");
        }
        else if (message.content.startsWith(";nudes")) {
            var responses = ["https://cdn.discordapp.com/attachments/226545685753757696/237087059741900801/landmine.png", "https://cdn.discordapp.com/attachments/226545685753757696/237087102343446528/lewd2.png", "https://cdn.discordapp.com/attachments/226545685753757696/237087127320395777/rangerface.png", "https://cdn.discordapp.com/attachments/226545685753757696/237087166373560322/auonig.png", "https://cdn.discordapp.com/attachments/226545685753757696/237087188276215809/bt.png", "https://cdn.discordapp.com/attachments/236247143696957453/236848321040220170/lewd.png", "https://cdn.discordapp.com/attachments/226545685753757696/237087531630460928/sanicxfast.png", "https://cdn.discordapp.com/attachments/226545685753757696/237088031088181248/sanicxfast30.png", "https://cdn.discordapp.com/attachments/226545685753757696/237088058086916097/sanicxfast32.png", "https://cdn.discordapp.com/attachments/226545685753757696/237088101783044096/sanicxfast4.png"];
            bot.sendFile(hello, `${responses[Math.floor(Math.random() * (responses.length))]}`);
            var responses = ["( ͡° ͜ʖ ͡°)", "Do you like the way I move ( ͡° ͜ʖ ͡°)", "Don't tell dad I'm sending you those ( ͡° ͜ʖ ͡°)", "Check ur DM's, I've sent you something ( ͡° ͜ʖ ͡°)"];
            bot.sendMessage(message, `${responses[Math.floor(Math.random() * (responses.length))]}`);
        }
        else if (input.startsWith(";BAN ")) {
            var mementions = message.mentions;
            var aftercontent = themsg.replace(/;BAN ?/i, "");
            if (aftercontent === "" || aftercontent === "") {
                bot.reply(message, "The correct syntax is `;ban @name`!");
            } else if (aftercontent.startsWith("<@")) {
                try {
                    if (mementions.length === 0 || !mementions || mementions === "") {
                        bot.reply(message, "The correct syntax is `;ban @name`!");
                    } else if (mementions.length === 1) {
                        bot.sendMessage(message, "Successfully banned " + mementions + "!");
                    } else {
                        bot.reply(message, "The correct syntax is `;ban @name`!");
                    }
                } catch (err) {
                    console.log(err.message);
                }
            } else {
                bot.reply(message, "The correct syntax is `;ban @name`!");
            }
        }
        else if (input === ";HALP") {
            bot.sendMessage(message, "I've sent help via DM.");
            bot.sendMessage(hello, "No, if you want help you need to type *;help*.");
        }
        else if (input === ";YUBEDOINTHIS") {
            bot.sendMessage(message, "Uh, I'm not sure why I'm doin this");
        }
        else if (message.content.startsWith(";8ball")) {
            var responses = ["lol no", "Without a doubt", "You may rely on it", "orca says no", "Yes", "Signs point to yes", "Better not tell you now", "Don't count on that", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful", "Rest in Peace", "How may I help you?", "Are you okay?", "My mom is not a gibberish", "Really Nigga", "Want some Milk?", "Null", "My name is Stephen Curryhair", "If the second digit of the milliseconds value is even"];
            bot.sendMessage(message, `🎱 ${responses[Math.floor(Math.random() * (responses.length))]}`);
        }
        else if (input === ";ADDME") {
            bot.sendMessage(message, "I've added you to the user list, if you've already been added you will recieve a dm from me.");
            bot.sendMessage(hello, "Hi");
        }
        else if (input === ";NUKE") {
            bot.sendMessage(message, "https://cdn.discordapp.com/attachments/214737934006484993/237334157724876800/firstsoviethbomb1_4604730_GIFSoup.com.gif");
        }
        else if (input === ";DISABLE ;NUDES ALL" && isStaff(message.author)) {
            bot.sendMessage(message, "Command ``;nudes`` disabled for all users.");
        }
        else if (input === ";GREG") {
            if (message.author.id != gregid) {
                bot.sendMessage(message, "Only Greg can use this command, you try.");
            } else {
                bot.sendMessage(message, "Hi maker of me :)");
            }
        }
        else if (input.startsWith(";SAY ")) {
            if (isStaff(message.author) || message.author.bot == true) {
                var status = themsg.replace(/;say ?/i, "");
                bot.sendMessage(message, ":information_source: " + status);
            } else {
                bot.sendMessage(message, "```diff\n! Only staff members can use this.\n```");
            }
        }
        else if (input === ";CHATLOG") {
            if (isStaff(message.author)) {
                chatlog = !chatlog;
                bot.sendMessage(message, ":white_check_mark: Successfully " + (chatlog ? "enabled" : "disabled") + " module");
            }
        }
        else if (input === ";WORK") {
            if (isStaff(message.author)) {
                maintenance = !maintenance;
                bot.sendMessage(message, ":white_check_mark: Maintenance mode " + (maintenance ? "enabled" : "disabled") + ".");
            }
        }
        else if (input.startsWith(";PM ")) {
            if (isStaff(message.author)) {
                var status2 = message.content.replace(/;pm ?/i, ""); //Q: What is this supposed to do?? A: So you can make the bot say something. Without it, It wont work - Lego
                bot.sendMessage(message, ":warning: " + status2 + " :warning:");
            } else {
                bot.sendMessage(message, "```diff\n! Only users with code access can use this\n```");
            }
        }
        else if (input === ";AMISTAFF") {
            bot.sendMessage(message, isStaff(message.author) ? "Yes u are" : "no ur not, rip");
        }
        else if (input.startsWith(";EVAL ") && isStaff(message.author)) {
            try {
                var asdf = eval(themsg.replace(/;eval ?/i, ""));
                if (asdf != null || asdf != undefined) {
                    bot.sendMessage(message, asdf.toString());
                } else if (!asdf.toString) {
                    bot.sendMessage(message, ":warning: Error: cannot turn result into string");
                } else if (asdf == undefined) {
                    bot.sendMessage(message, "undefined");
                } else if (asdf == null) {
                    bot.sendMessage(message, "null");
                }
            } catch (e) {
                bot.sendMessage(message, ":warning: Error: `" + e.message + "`");
            }

        }else if(input == ";DOWNLOAD") {
			if(isStaff(message.author)) {
				bot.sendMessage(message.author, "Dropbox link goes here");
			}else{
				bot.sendMessage(message, "You cannot use this command.");
			}
		}
    }
});

function isStaff(user) {
    if (!user) { return false; }
    for (var i = 0; i < staffroles.length; ++i) {
        if (user.hasRole(staffroles[i])) {
            return true;
        }
    }
    if (stafflist.indexOf(user.id) != -1) {
        return true;
    }
    return false;
}

function handleTank(message, stuff) {
    if (tankCommands.indexOf(message) != -1) {
        bot.sendMessage(stuff, tankDescript[tankCommands.indexOf(message)]);
    }
}

bot.loginWithToken("MjMwMTI1MjI4NDE0NDY4MDk2.CstQWA.4-90lCoMWAlGw1OjtfV2nQSiDIQ");