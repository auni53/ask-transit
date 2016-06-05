/**
  Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

    http://aws.amazon.com/apache2.0/

  or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
let APP_ID; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

import AlexaSkill from './AlexaSkill';

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
const SpaceGeek = function () {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SpaceGeek.prototype = Object.create(AlexaSkill.prototype);
SpaceGeek.prototype.constructor = SpaceGeek;

SpaceGeek.prototype.eventHandlers.onSessionStarted = (sessionStartedRequest, session) => {
  console.log(`SpaceGeek onSessionStarted requestId: ${sessionStartedRequest.requestId}, sessionId: ${session.sessionId}`);
  // any initialization logic goes here
};

SpaceGeek.prototype.eventHandlers.onLaunch = (launchRequest, session, response) => {
  console.log(`SpaceGeek onLaunch requestId: ${launchRequest.requestId}, sessionId: ${session.sessionId}`);
  handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
SpaceGeek.prototype.eventHandlers.onSessionEnded = (sessionEndedRequest, session) => {
  console.log(`SpaceGeek onSessionEnded requestId: ${sessionEndedRequest.requestId}, sessionId: ${session.sessionId}`);
  // any cleanup logic goes here
};

SpaceGeek.prototype.intentHandlers = {
  "GetNewFactIntent"(intent, session, response) {
    handleNewFactRequest(response);
  },

  "AMAZON.HelpIntent"(intent, session, response) {
    response.ask("You can ask Space Geek tell me a space fact, or, you can say exit... What can I help you with?", "What can I help you with?");
  },

  "AMAZON.StopIntent"(intent, session, response) {
    const speechOutput = "Goodbye";
    response.tell(speechOutput);
  },

  "AMAZON.CancelIntent"(intent, session, response) {
    const speechOutput = "Goodbye";
    response.tell(speechOutput);
  }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
  // Get a random space fact from the space facts list
  const info = LEADERSHIP_PRINCIPLES;
  const i = Math.floor(Math.random() * Object.keys(info).length);
  let count = 0;

  let principle = null;
  for (const item in info) {
    if (count === i) principle = item;
    count++;
  }

  const fact = info[principle];

  // Create speech output
  const speechOutput = `${principle} is about how ${fact}`;

  response.tellWithCard(speechOutput, "SpaceGeek", speechOutput);
}

export function handler(event, context) {
  // Create an instance of the SpaceGeek skill.
  const transitClient = new SpaceGeek();
  transitClient.execute(event, context);
};

