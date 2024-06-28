const TextClassificationRephrase = require('../src/index');

test('Framework processes comments correctly', async () => {
  const framework = new TextClassificationRephrase({
    en: './models/en/text_classification_model.json',
    es: './models/es/text_classification_model.json',
    fr: './models/fr/text_classification_model.json',
    id: './models/id/text_classification_model.json'
  }, {
    en: './embeddings/en/word2vec.bin',
    es: './embeddings/es/word2vec.bin',
    fr: './embeddings/fr/word2vec.bin',
    id: './embeddings/id/word2vec.bin'
  });
  await framework.init();

  const positiveCommentEn = "Great job!";
  const negativeCommentEn = "This is terrible.";
  const positiveCommentId = "Kerja bagus!";
  const negativeCommentId = "Ini buruk.";

  const processedPositiveCommentEn = await framework.processComment(positiveCommentEn);
  const processedNegativeCommentEn = await framework.processComment(negativeCommentEn);
  const processedPositiveCommentId = await framework.processComment(positiveCommentId);
  const processedNegativeCommentId = await framework.processComment(negativeCommentId);

  expect(processedPositiveCommentEn).toBe("That's great! Great job!");
  expect(processedNegativeCommentEn).toBe("Keep it up! Don't let it get you down. This is terrible.");
  expect(processedPositiveCommentId).toBe("Itu hebat! Kerja bagus!");
  expect(processedNegativeCommentId).toBe("Tetap semangat! Jangan biarkan hal itu membuatmu down. Ini buruk.");
});
