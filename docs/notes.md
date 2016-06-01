Commands:

routes for agency <a>:
http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=<a>

stops, directions, paths for route <r> for agency <a>
http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=<a>&r=<r>

predictions for stop <s> for agency <a>
http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=<a>&stopId=<s>

predictions for route <r> at stop <s> for agency <a>
http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=<a>&stopId=<s>&routeTag=<r>

- Client interface with two main components
  > data functions
    * routeList(agency)
    * stopList(agency, route)
    * prediction(agency, route, direction, stop)
      + "echo, when's the next <route> <direction> at <stop>"
      + "echo, when's the next <route> <direction> for <stop>"
      + "echo, when is the next <route> <direction> at <stop>"
      + "echo, when is the next <direction>-bound <route> at <stop>"
      + "echo, when is the next <direction>-bound <route> coming to <stop>"
      + "echo, how long until the? next? <route> <direction> comes to <stop>"
      + "echo, how long until the? next? <route> <direction> gets to <stop>"
    * nearby(agency, stop)
  > stop catalogue
    * 'entity resolution' for stops
    * "Harbord and Bathurst" should return all stop numbers that match
  > multi(...agencies) will filter through multiple agencies. Find the best stop match, then match that stop to a route.

- Personalization
  + "echo, save my agency as TTC"
  + "echo, save my location as Harbord and Bathurst"
