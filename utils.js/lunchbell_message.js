const bellGifs = [
  'https://media.giphy.com/media/3vEIcic7xp9VHI2TFC/giphy.gif',
  'https://media.giphy.com/media/l0He3K120iZ7rXlHa/giphy.gif',
  'https://media.giphy.com/media/xUNd9EG4XJLj58VA8E/giphy.gif',
  'https://media.giphy.com/media/xTiQymjYza10NhOFDa/giphy.gif',
  'https://media.giphy.com/media/3oFzm0F8nf3BRILjX2/giphy.gif'
];

const ringMessage = () => {
  
  return `<!here> ${_.sample(bellGifs)}`;
};

module.exports = {
  bellGifs,
  ringMessage
};
