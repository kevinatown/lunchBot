/*

WHAT IS THIS?

This module demonstrates simple uses of Botkit's `hears` handler functions.

In these examples, Botkit is configured to listen for certain phrases, and then
respond immediately with a single line response.

*/

var wordfilter = require('wordfilter');
var _ = require('lodash');
module.exports = function(controller) {

    /* Collect some very simple runtime stats for use in the uptime/debug command */
    var stats = {
        triggers: 0,
        convos: 0,
    }
    
    const shameSomeone = (maxShames, name, times, message, bot) => {
      bot.reply(message, `*SHAME ${name}*`);
      times++;
      if (times < maxShames-1) {
        setTimeout(() => shameSomeone(maxShames, name, times, message, bot), 1000);
      }
    }

    controller.on('heard_trigger', function() {
        stats.triggers++;
    });

    controller.on('conversationStarted', function() {
        stats.convos++;
    });

    controller.hears([new RegExp(/((?<!not )pizza)/i)], 'ambient,mention', function(bot, message) {
      const pizzas = [
        'https://media.giphy.com/media/aCKMaeduKfFXG/giphy.gif',
        'https://media.giphy.com/media/1108D2tVaUN3eo/giphy.gif',
        'https://media.giphy.com/media/e2AKpOvx2MREY/giphy.gif',
        'https://media.giphy.com/media/3o7btXJrqLo5bbtQDm/giphy.gif',
        'https://media.giphy.com/media/OZpBpm7c2AGFG/giphy.gif',
        'https://media.giphy.com/media/OJ8hVSLYbpQ08/giphy.gif',
        'https://media.giphy.com/media/eMeMQ0Y4DHS2k/giphy.gif',
        'https://media.giphy.com/media/iJa6kOfJ3qN7a/giphy.gif',
        'https://media.giphy.com/media/114ugL1hv5p8He/giphy.gif',
        'https://media.giphy.com/media/wqHXbOcynM7Oo/giphy.gif',
        'https://media.giphy.com/media/BPofSmBGnwJIQ/giphy.gif',
        'https://media.giphy.com/media/mZWAgG8U4sXzW/giphy.gif',
        'https://giphy.com/gifs/kVXtSmeOZoRIQ/html5',
        'https://media.giphy.com/media/xsBP0RdvxJfhu/giphy.gif',
        'https://media.giphy.com/media/9B5EkgWrF4Rri/giphy.gif',
        'https://media.giphy.com/media/QIghDKst8OMko/giphy.gif',
        'https://media.giphy.com/media/UBOnpTafKwECI/giphy.gif',
        'https://media.giphy.com/media/3o85g0xzxEhCnfYgiQ/giphy.gif',
        'https://media.giphy.com/media/xTiTnCxAxq0SxKWVfa/giphy.gif',
        'https://media.giphy.com/media/3o7TKJG8p39T1hJFLO/giphy.gif',
        'https://media.giphy.com/media/werVqqNW4mixG/giphy.gif',
        'https://media.giphy.com/media/AeWntMyxGFXXi/source.gif'
      ];
      console.log(_.sample(pizzas));
      bot.reply(message, `${_.sample(pizzas)}`);   
    });

    controller.hears(['^uptime','^debug'], 'direct_message,direct_mention', function(bot, message) {

        bot.createConversation(message, function(err, convo) {
            if (!err) {
                convo.setVar('uptime', formatUptime(process.uptime()));
                convo.setVar('convos', stats.convos);
                convo.setVar('triggers', stats.triggers);

                convo.say('My main process has been online for {{vars.uptime}}. Since booting, I have heard {{vars.triggers}} triggers, and conducted {{vars.convos}} conversations.');
                convo.activate();
            }
        });

    });

    controller.hears(['^say (.*)','^say'], 'direct_message,direct_mention', function(bot, message) {
        if (message.match[1]) {

            if (!wordfilter.blacklisted(message.match[1])) {
                bot.reply(message, message.match[1]);
            } else {
                bot.reply(message, '_sigh_');
            }
        } else {
            bot.reply(message, 'I will repeat whatever you say.')
        }
    });
  
    controller.hears('((i|im|i\'m|me)[\ ]+)+(?:[(?:\w+)(?:\s+)]+)*(hungry[!]?)(?:[(?:\w+)(?:\s+)]+)*', 'direct_message,direct_mention,ambient,mention', function(bot, message) { 
      if (message.match[1] && _.trim(_.toLower(message.match[1])) === 'me') {
        bot.reply(message, '_You hungry. Me lunchbot_ :dealwithittrump:');
      } else if (message.match[1]) {
          bot.reply(message, '_Hi hungry I\'m lunchbot_ :dealwithittrump:');      
      }
    });
  
    // controller.hears([new RegExp(/^shame (<@[A-Z0-9]*>)(\s\d)?/i)], 'direct_message,direct_mention,ambient,mention', function(bot, message) {
    //     if (message.match[1] && message.match[1] !== '<@UAUUZAUCD>') {
    //       const times = 0;
    //       const name = message.match[1];
    //       const maxShames = message.match[2] ? parseInt(_.trim(message.match[2]), 10) : 3;
    //       bot.reply(message, `*SHAME ${name}*`);
    //       setTimeout(() => shameSomeone(maxShames, name, times, message, bot), 1000);
    //     } else if (message.match[1] && message.match[1] === '<@UAUUZAUCD>') {
    //       const times = 0;
    //       const name = `<@${message.event.user}>`;
    //       const maxShames = message.match[2] ? parseInt(_.trim(message.match[2]), 10) : 3;
    //       bot.reply(message, `*HAHA NICE TRY! ${name}*`);
    //       bot.reply(message, `*SHAME ${name}*`);
    //       setTimeout(() => shameSomeone(maxShames, name, times, message, bot), 1000);
    //     }
    // });
  
    
    controller.hears([new RegExp(/^shame (<@[A-Z0-9]*>)(\s\d)?/i)], 'direct_message,direct_mention,ambient,mention', function(bot, message) {
        if (message.match[1] && message.match[1] !== '<@UAUUZAUCD>') {
          const times = 0;
          const name = message.match[1];
          const maxShames = message.match[2] ? parseInt(_.trim(message.match[2]), 10) : 3;
          bot.reply(message, `*SHAME ${name}*`);
          setTimeout(() => shameSomeone(maxShames, name, times, message, bot), 1000);
        } else if (message.match[1] && message.match[1] === '<@UAUUZAUCD>') {
          const times = 0;
          const name = `<@${message.event.user}>`;
          const maxShames = message.match[2] ? parseInt(_.trim(message.match[2]), 10) : 3;
          bot.reply(message, `*HAHA NICE TRY! ${name}*`);
          bot.reply(message, `*SHAME ${name}*`);
          setTimeout(() => shameSomeone(maxShames, name, times, message, bot), 1000);
        }
    });
  
  controller.hears([new RegExp(/(lunchbot)/i)], 'ambient,mention', function(bot, message) {
    bot.reply(message, `*SPEAK MORTAL FOR I AM THE TRUE LUNCHBOT*`);    
  });
  
  


    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* Utility function to format uptime */
    function formatUptime(uptime) {
        var unit = 'second';
        if (uptime > 60) {
            uptime = uptime / 60;
            unit = 'minute';
        }
        if (uptime > 60) {
            uptime = uptime / 60;
            unit = 'hour';
        }
        if (uptime != 1) {
            unit = unit + 's';
        }

        uptime = parseInt(uptime) + ' ' + unit;
        return uptime;
    }

};
