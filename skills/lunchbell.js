/*

Botkit Studio Skill module to enhance the "lunchbell" script

*/


module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    // See: https://botkit.ai/docs/readme-studio.html#controllerstudiobefore
    controller.studio.before('lunchbell', function(convo, next) {

        // do some preparation before the conversation starts...
        // for example, set variables to be used in the message templates
        // convo.setVar('foo','bar');

        console.log('BEFORE: lunchbell', convo);
        // don't forget to call next, or your conversation will never continue.
        next();

    });
  
    // define an after hook
    // you may define multiple after hooks. they will run in the order they are defined.
    // See: https://botkit.ai/docs/readme-studio.html#controllerstudioafter
    controller.studio.after('lunchbell', function(convo, next) {

        console.log('AFTER: lunchbell');

        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
}
