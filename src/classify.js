const tf = require('@tensorflow/tfjs-node');
const { preprocess } = require('./preprocess');
const word2vec = require('word2vec');

async function loadModel(modelPath) {
  return await tf.loadLayersModel(`file://${modelPath}`);
}

async function loadEmbeddings(embeddingPath) {
  return await word2vec.loadModel(embeddingPath);
}

async function classifyComment(model, comment, embeddings, language) {
  const processedComment = await preprocess(comment, embeddings, language);
  const prediction = model.predict(tf.tensor([processedComment]));
  const sentiment = prediction.dataSync()[0];
  return sentiment > 0.5 ? 'positive' : 'negative';
}

module.exports = { loadModel, loadEmbeddings, classifyComment };
