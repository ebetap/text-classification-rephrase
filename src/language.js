const franc = require('franc');

function detectLanguage(comment) {
  const langCode = franc(comment);
  switch (langCode) {
    case 'eng':
      return 'en';
    case 'spa':
      return 'es';
    case 'fra':
      return 'fr';
    case 'ind':
      return 'id';
    default:
      return 'en';
  }
}

module.exports = { detectLanguage };
