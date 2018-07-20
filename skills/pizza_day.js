/*

Pizza day commands

*/

var _ = require('lodash');
var moment = require('moment');
var { botShouldAnswer } = require('../utils/restrict.js');

module.exports = function(controller) {
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

  controller.hears([new RegExp(/((?<!not )pizza)/i)], 'ambient,mention', function(bot, message) {
    if (botShouldAnswer(message) && moment().day() === 5) {
      bot.reply(message, `${_.sample(pizzas)}`);   
    }
  });

};
