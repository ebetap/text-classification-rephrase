async function preprocess(comment, embeddings, language) {
  const tokens = comment.split(' ');
  const vector = tokens.map(token => embeddings.getVector(token).values);
  return [].concat(...vector);
}

module.exports = { preprocess };
