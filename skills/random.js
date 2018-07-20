/*

Botkit Studio Skill module to enhance the "where_to_eat" script

*/

var request = require('request');
var _ = require('lodash');
module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    // See: https://botkit.ai/docs/readme-studio.html#controllerstudiobefore
    controller.studio.before('random_spot', function(convo, next) {  
      const lunchSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1TxkIFQRyrioIDnDKaHNny_F8_fopw7ijjC1VpoPFU2g/values/Sheet1!A1:A100?majorDimension=COLUMNS&key=AIzaSyD1FFpC5oIZaZ3TJ11IcH4I_B55cejsSow';
      request(lunchSheetUrl, function (error, response, body) {
        let choices = [];
        if (response && response.statusCode === 200) {
          choices = _.sampleSize(_.filter(_.get(JSON.parse(body), 'values[0]'), (x) => x !== ''), 1);
        }
        convo.setVar('choice', _.get(choices, '0'));
        next();
      });
    });

    controller.studio.after('random_spot', function(convo, next) {

        console.log('AFTER: random_spot');
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
