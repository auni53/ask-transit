const session = {
  'new': true,
  'sessionId': 'session1234',
  'attributes': {},
  'user': {
    'userId': null
  },
  'application': {
    'applicationId': 'amzn1.echo-sdk-ams.app.[unique-value-here]'
  }
};
const version = '1.0';
const requestId = 'request5678';

export const template = {
  session,
  version,
};

export const requests = [

  {
    'type': 'LaunchRequest',
  },

  {
    'type': 'IntentRequest',
    'intent': {
      'name': 'GetTimesIntersection',
      'slots': {
        'route': {
          'name': 'route'
        },
        'agency': {
          'name': 'agency',
          'value': 'ttc'
        },
        'streetA': {
          'name': 'streetA',
          'value': 'harbord'
        },
        'streetB': {
          'name': 'streetB',
          'value': 'Bathurst'
        },
        'direction': {
          'name': 'direction'
        }
      }
    },
  },

  {
    'type': 'IntentRequest',
    'intent': {
      'name': 'GetTimesNumber',
      'slots': {
        'route': {
          'name': 'route'
        },
        'agency': {
          'name': 'agency',
          'value': 'ttc'
        },
        'stop': {
          'name': 'stop',
          'value': '00067'
        },
        'direction': {
          'name': 'direction'
        }
      }
    },
  },
];
