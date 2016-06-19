import { Skill, Launch, Intent } from 'alexa-annotations';
import { say, ask } from 'alexa-response';
import { ssml } from 'alexa-ssml';

import Client from 'services/Client';
import interpret from 'lib/interpreter';

@Skill
export default class Transit {

  @Launch
  launch() {
    return say('Welcome to ASK transit');
  }

  @Intent('GetTimesNumber')
  getTimesNumber({ agency, stop, route, direction }) {
    let client = new Client(agency.toLowerCase());
    return client.findTimes(stop, route, direction)
            .then(p => say(interpret(p)))
            .catch(error => say(error.message));
  }

  @Intent('GetTimesLabel')
  getTimesLabel({ agency, label, route, direction }) {
    let client = new Client(agency.toLowerCase());
    return client.findTimes(label.toLowerCase(), route, direction)
            .then(p => say(interpret(p)))
            .catch(error => say(error.message));
  }

  @Intent('GetTimesIntersection')
  getTimesIntersection({ agency, streetA, streetB, route, direction }) {
    let client = new Client(agency.toLowerCase());
    return client.findTimes(`${streetA.toLowerCase()} ${streetB.toLowerCase()}`, route, direction)
            .then(p => say(interpret(p)))
            .catch(error => say(error.message));
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return ask('I can get bus, subway, and streetcar times for you.')
      .reprompt('For what agency do you want times?');
  }

  @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent')
  stop() {
    return say('Hope you catch your bus!');
  }
}

module.exports = Transit;
