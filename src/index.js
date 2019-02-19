const EventML = require('./services/eventML')
const { openDatabase, closeDatabase } = require('./services/databaseService')
const { listEvents } = require('./services/eventService')
const config = require('./config')

openDatabase(config.get('db.url'))
  .then(() => {
		listEvents().then(events => {
			const eventML = new EventML()
			eventML.run()
			const defaultScore = 0

			const promises = events.map(event => {
				const prediction = eventML.getPrediction(event.description)
				event.score = parseInt(prediction[0] || defaultScore)
				return event.save()
			})

			Promise.all(promises)
				.then(results => {
					console.log(`${results.length} classifications made :)`)
					closeDatabase()
				})
		})
  })
  .catch(console.log)
