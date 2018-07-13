// 
// No lunchbot for anyone but lunchbuddies!
// 

const botShouldAnswer = (message) => {
  return (message.channel === 'GAVAJML07' || message.user === 'UAU3TNC5R');
}

module.exports = {
  botShouldAnswer
};
