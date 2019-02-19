const EventModel = require('../model/eventModel')

function saveEvent(event) {
  return new EventModel(event).save()
}

function listEvents(query = {}) {
  return EventModel.find(query)
}

module.exports.saveEvent = saveEvent
module.exports.listEvents = listEvents
