const _ = require('lodash');

const bellGifs = [
  'https://media.giphy.com/media/3vEIcic7xp9VHI2TFC/giphy.gif',
  'https://media.giphy.com/media/l0He3K120iZ7rXlHa/giphy.gif',
  'https://media.giphy.com/media/xUNd9EG4XJLj58VA8E/giphy.gif',
  'https://media.giphy.com/media/xTiQymjYza10NhOFDa/giphy.gif',
  'https://media.giphy.com/media/3oFzm0F8nf3BRILjX2/giphy.gif'
];

const oneMinuteGif = 'https://media.giphy.com/media/zNCabuTpc0Yfe/giphy.gif';
const fiveMinutesGif = 'https://i.imgur.com/fZN7hhz.gif';

const ringMessage = () => {
  return `<!here> ${_.sample(bellGifs)}`;
};

const ringInMinutes = (mins, bot, message) => {
  const ms = min * 60000;
  setTimeout(ms, () => bot.reply(message, ringMessage()));
}

module.exports = function(controller) {
 
  controller.hears(['.*(bell|BELL).*','.*(RING|ring).*'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.reply(message, ringMessage());
  });

  controller.hears(['start.*countdown','1min'], 'direct_message,direct_mention,mention', function(bot, message) {
    const response = `Ze countdown ${oneMinuteGif}`;
    ringInMinutes(1, bot, message);
    bot.reply(message, response);
  });

  controller.hears(['5.{0,10}minutes'], 'direct_message,direct_mention,mention', function(bot, message) {
    const response = `THE COUNTDOWN HAS BEGUN ${fiveMinutesGif}`;
    ringInMinutes(5, bot, message);
    bot.reply(message, response);
  });

};
