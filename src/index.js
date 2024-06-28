const classify = require('./classify');
const rephrase = require('./rephrase');
const { detectLanguage } = require('./language');
const { logger } = require('./logger');

class TextClassificationRephrase {
  constructor(modelPaths, embeddingPaths) {
    this.modelPaths = modelPaths;
    this.embeddingPaths = embeddingPaths;
    this.models = {};
    this.embeddings = {};
  }

  async init() {
    try {
      for (const [lang, path] of Object.entries(this.modelPaths)) {
        this.models[lang] = await classify.loadModel(path);
        logger.info(`Loaded model for ${lang}`);
      }
      for (const [lang, path] of Object.entries(this.embeddingPaths)) {
        this.embeddings[lang] = await classify.loadEmbeddings(path);
        logger.info(`Loaded embeddings for ${lang}`);
      }
    } catch (error) {
      logger.error(`Error initializing models or embeddings: ${error.message}`);
    }
  }

  async processComment(comment) {
    try {
      const language = detectLanguage(comment);
      logger.info(`Detected language: ${language}`);
      const model = this.models[language] || this.models['en'];
      const embeddings = this.embeddings[language] || this.embeddings['en'];
      const sentiment = await classify.classifyComment(model, comment, embeddings, language);
      logger.info(`Classified sentiment: ${sentiment}`);
      return rephrase.rephraseComment(comment, sentiment, language);
    } catch (error) {
      logger.error(`Error processing comment: ${error.message}`);
      return null;
    }
  }
}

module.exports = TextClassificationRephrase;
