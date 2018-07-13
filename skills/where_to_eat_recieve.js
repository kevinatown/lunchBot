const _ = require('lodash');
module.exports = function(controller) {

    // create special handlers for certain actions in buttons
    // if the button action is 'say', act as if user said that thing
    controller.middleware.receive.use(function(bot, message, next) {
      if (message.type == 'interactive_message_callback') {
        if (message.callback_id === 'where_to_eat' && message.user) {
          const person = '<@' + message.user + '>';
          const reply = message.original_message;
          // console.log(message.actions[0].value, _.unescape(message.actions[0].value));
          const curVote = _.find(reply.attachments, (x) => x.actions[0].value === message.actions[0].value);
          if (curVote) {  
            const footer = curVote.footer ? `${curVote.footer}, ` : '';
            if (footer.indexOf(person) > -1) {
              reply.attachments.push(
                    {
                        text: `${person} don't be greedy you already voted for ${_.unescape(message.actions[0].name)}`,
                    }
                );
              bot.replyInteractive(message, reply);
            } else {
              curVote.footer = `${footer}${person}`
              let count = parseInt(curVote.text, 10);
              curVote.text = count+= 1;


              reply.attachments.push(
                    {
                        text: person + ' voted: ' + _.unescape(message.actions[0].name),
                    }
                );
              bot.replyInteractive(message, reply);
            }
          } else {
            reply.attachments.push(
                  {
                      text: 'Whoops those darn special chars are messing me up :feelsbadman:',
                  }
              );
            bot.replyInteractive(message, reply);
          }
        }
      }
      
      next();    
      
    });

}
