import { Skill, Launch, Intent } from 'alexa-annotations';
import { say, ask } from 'alexa-response';
import { ssml } from 'alexa-ssml';
import Client from './Client';

@Skill
export default class Transit {

  @Launch
  launch() {
    return say('Welcome to ASK transit');
  }

  @Intent('GetTimes')
  getTimes({ agency, stop, route, direction }) {
    console.log(agency, stop, route, direction);

    let client = new Client();
    client.load(agency.toLowerCase());
    const getMinute = times => (times != null
                          ? Math.floor(times[0] / 60) + ''
                          : 'nope');

    return client.findTimes(stop, route, direction)
            .then(predictions => 
                say(`the ${predictions[0].route} is arriving in ${
                  getMinute(predictions[0].times)} minutes.`))
            .catch(error => say(error));
  }

  @Intent('AMAZON.HelpIntent')
  help() {
    return ask('I can get bus, subway, and streetcar times for you.')
      .reprompt('For what agency do you want times?');
  }

  @Intent('AMAZON.CancelIntent', 'AMAZON.StopIntent')
  stop() {
    let ssml;
    return say('Hope you catch your bus!');
  }

}
