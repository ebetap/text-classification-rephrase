function rephraseComment(comment, sentiment, language) {
  const phrases = {
    en: {
      positive: `That's great! ${comment}`,
      negative: `Keep it up! Don't let it get you down. ${comment}`
    },
    es: {
      positive: `¡Eso es genial! ${comment}`,
      negative: `¡Ánimo! No te desanimes. ${comment}`
    },
    fr: {
      positive: `C'est super! ${comment}`,
      negative: `Ne te laisse pas abattre. ${comment}`
    },
    id: {
      positive: `Itu hebat! ${comment}`,
      negative: `Tetap semangat! Jangan biarkan hal itu membuatmu down. ${comment}`
    }
  };

  const phrasesForLanguage = phrases[language] || phrases['en'];
  return sentiment === 'positive' ? phrasesForLanguage.positive : phrasesForLanguage.negative;
}

module.exports = { rephraseComment };
