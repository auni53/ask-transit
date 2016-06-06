
30 seconds
- "under a minute"
- "half a minute"
- "less than a minute"

45 seconds
- "forty-five seconds"
- "under a minute"
- "less than a minute"

100 seconds = 1:40 minutes
- "one minute and forty seconds"
- "under two minutes"
- "less than two minutes"
- "a minute and a half" (round down to nearest half-minute)

642 seconds = 10:42 minutes
- "around ten minutes"
- "ten minutes"
- "ten minutes and forty-two seconds"
- "ten and a half minutes" (round down to nearest half-minute)

971 seconds = 16:11 minutes
- "sixteen minutes"
- "around fifteen minutes"
- "sixteen minutes and eleven seconds"

15 seconds
- "about zero minutes"
- "now"
- "good luck"

single
[
    {
        'route': '94',
        'label': 'east wellesley towards castle frank station',
        'times': [179, 642, 1056, 1567, 2167],
    }, 
]

Long:
- "the 94 east on wellesley towards castle frank station arrives in two and a half minutes, then 10 minutes"

Short:
- "the 94 east arrives in two and a half minutes. another is coming in ten minutes."


'two_valids': 
[
    {
        'route': '94',
        'label': 'east wellesley towards castle frank station',
        'times': [933, 2133, 3333],
    }, 
    {
        'route': '161',
        'label': 'west rogers rd towards jane',
        'times': [513, 1113, 1429, 2122, 2629],
    }, 
],

Ordered by response:
- "the 94 east on wellesley towards castle frank station arrives in fifteen minutes. the 161 west on rogers road towards jane arrives in nine minutes, then nineteen minutes." 

Ordered by which bus is coming first:
- "the 161 west on rogers road towards jane arrives in nine minutes, then nineteen minutes. the 94 east on wellesley towards castle frank station arrives in fifteen minutes."

Shortest possible response:
- "the 161 west arrives nine minutes, and the the 94 east arrives in fifteen minutes."


'two_some_valid': 
[
    { 
        route: '310',
        label: 'south bathurst blue night towards exhibition',
        times: null 
    },
    { 
        route: '511',
        label: 'south bathurst towards fleet loop',
        times: [ '63', '358', '866', '1138', '1674' ]
    }
    { 
        route: '511',
        label: 'south bathurst towards roncesvalles',
        times: [ '131', '471']
    }
],

Merge similar route/directions
- "the 511 south arrives in one minute, then two minutes."

Keep separate
- "the 511 south on bathurst towards fleet loop arrives in one minute, then six minutes. the 511 south on bathurst towards roncesvalles arrives in two minutes, then eight minutes."

Medium
- "the 511 south on bathurst towards fleet loop arrives in one minute, and south on bathurst towards roncesvalles in two minutes.

'impossible': 
[
    {
        'route': '94',
        'label': 'east wellesley towards castle frank station',
        'times': [179, 642, 1056, 1567, 2167],
    }, 
    {
        'route': '94',
        'label': 'west - 94a wellesley towards ossington station',
        'times': [384, 869, 1429, 2122, 2629],
    }, 
    {
        'route': '511', 
        'label': 'north bathurst towards bathurst station',
        'times':    [27, 250, 714, 1380, 1740],
    }, 
    {
        'route': '511',
        'label': 'south bathurst towards fleet loop',
        'times': [903, 1018, 1263, 1983, 2343],
    }, 
    {
        'route': '310',
        'label': 'south bathurst blue night towards exhibition',
        'times': [],
    }, 
    {
        'route': '310',
        'label': 'north bathurst blue night towards steele',
        'times': [],
    }, 
]

Read aloud all of them:
- "???"

Long response:
- "I found times for the 94 east, the 94 west, the 511 north, the 511 south, the 310 south, and the 310 north. what route would you like times for?"

Long response:
- "I found times for the 94 east, the 94 west, the 511 north, the 511 south, the 310 south, and the 310 north. what route would you like times for?"
