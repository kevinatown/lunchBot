
var { botShouldAnswer } = require('../utils/restrict.js');

module.exports = function(controller) {
  controller.on('user_channel_join,user_group_join', function(bot, message) {
    if (botShouldAnswer(message)) {
      bot.reply(message, 'Welcome, <@' + message.user + '>');
    }
  });
}
