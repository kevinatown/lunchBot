const _ = require('lodash');
const { ringMessage } = require('../utils/lunchbell_message');

module.exports = function(controller) {
 
  controller.hears(['.*(bell|BELL).*','.*(RING|ring).*'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.reply(message, ringMessage());
  });

};
