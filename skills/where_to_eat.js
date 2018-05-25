/*

Botkit Studio Skill module to enhance the "where_to_eat" script

*/

var request = require('request');
var _ = require('lodash');
var moment = require('moment');
module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    // See: https://botkit.ai/docs/readme-studio.html#controllerstudiobefore
    controller.studio.before('where_to_eat', function(convo, next) {  
      const lunchSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TxkIFQRyrioIDnDKaHNny_F8_fopw7ijjC1VpoPFU2g/values/Sheet1!A1:A100?majorDimension=COLUMNS&key=AIzaSyD1FFpC5oIZaZ3TJ11IcH4I_B55cejsSow';
      request(lunchSheetUrl, function (error, response, body) {
        let choices = [];
        if (response && response.statusCode === 200) {
          choices = _.sampleSize(_.filter(_.get(JSON.parse(body), 'values[0]'), (x) => x !== ''), 3);
        }
        // controller.storage.channels.save({id: 'where_to_eat', date: moment(), choices }, (err) => console.log(err));
        // console.log(_.unescape(_.get(choices, '0')), _.unescape(_.get(choices, '1')), _.unescape(_.get(choices, '2')))
        convo.setVar('choice1', { name: _.unescape(_.get(choices, '0')), votes: 0, id: `choice_${_.uniqueId()}` });
        convo.setVar('choice2', { name: _.unescape(_.get(choices, '1')), votes: 0, id: `choice_${_.uniqueId()}` });
        convo.setVar('choice3', { name: _.unescape(_.get(choices, '2')), votes: 0, id: `choice_${_.uniqueId()}` });
        next();
      });
    });

    /* Validators */
    // Fire a function whenever a variable is set because of user input
    // See: https://botkit.ai/docs/readme-studio.html#controllerstudiovalidate
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Validate user input: question_1
//     controller.studio.validate('where_to_eat','question_1', function(convo, next) {

//         var value = convo.extractResponse('question_1');

//         // test or validate value somehow
//         // can call convo.gotoThread() to change direction of conversation

//         console.log('VALIDATE: where_to_eat VARIABLE: question_1');

//         // always call next!
//         next();

//     });

//     // Validate user input: question_2
//     controller.studio.validate('where_to_eat','question_2', function(convo, next) {

//         var value = convo.extractResponse('question_2');

//         // test or validate value somehow
//         // can call convo.gotoThread() to change direction of conversation

//         console.log('VALIDATE: where_to_eat VARIABLE: question_2');

//         // always call next!
//         next();

//     });

//     // Validate user input: question_3
//     controller.studio.validate('where_to_eat','question_3', function(convo, next) {

//         var value = convo.extractResponse('question_3');

//         // test or validate value somehow
//         // can call convo.gotoThread() to change direction of conversation

//         console.log('VALIDATE: where_to_eat VARIABLE: question_3');

//         // always call next!
//         next();

//     });

//     /* Thread Hooks */
//     // Hook functions in-between threads with beforeThread
//     // See: https://botkit.ai/docs/readme-studio.html#controllerstudiobeforethread
//     /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

//     // Before the default thread starts, run this:
//     controller.studio.beforeThread('where_to_eat','default', function(convo, next) {

//         /// do something fun and useful
//         // convo.setVar('name','value');

//         console.log('In the script *where_to_eat*, about to start the thread *default*');

//         // always call next!
//         next();
//     });

//     // Before the on_timeout thread starts, run this:
//     controller.studio.beforeThread('where_to_eat','on_timeout', function(convo, next) {

//         /// do something fun and useful
//         // convo.setVar('name','value');

//         console.log('In the script *where_to_eat*, about to start the thread *on_timeout*');

//         // always call next!
//         next();
//     });


    // define an after hook
    // you may define multiple after hooks. they will run in the order they are defined.
    // See: https://botkit.ai/docs/readme-studio.html#controllerstudioafter
    controller.studio.after('where_to_eat', function(convo, next) {

        console.log('AFTER: where_to_eat');
        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            console.log(responses);
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
}
