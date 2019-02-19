const limdu = require('limdu')

const traineData = require('../../data/trainedData.json')

class EventML {

  constructor() {
    this.classifier = null
  }
  
  setClassifier() {
    // First, define our base classifier type (a multi-label classifier based on winnow):
    const TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
      binaryClassifierType: limdu.classifiers.Winnow.bind(0, {retrain_count: 10})
    })
  
    // Now define our feature extractor - a function that takes a sample and adds features to a given features set:
    const WordExtractor = (input, features) => {
      input.split(" ").forEach(function(word) {
        features[word]=1
      })
    }
  
    // Initialize a classifier with the base classifier type and the feature extractor:
    this.classifier = new limdu.classifiers.EnhancedClassifier({
      classifierType: TextClassifier,
      featureExtractor: WordExtractor
    })
  }
  
  getCleanData(data) {
    return data.map(item => ({
      input: item.description,
      output: item.score
    }))
  }
  
  trainModel(cleanData) {
    this.classifier.trainBatch(cleanData)
  }

  run() {
    this.setClassifier()
    const cleanData = this.getCleanData(traineData)
    this.trainModel(cleanData)
  }

  getPrediction(guess) {
    return this.classifier ? this.classifier.classify(guess) : 'model needs to be trained'
  }
}

module.exports = EventML
