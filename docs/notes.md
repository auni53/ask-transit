Commands:

routes for agency <a>:
http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=<a>

stops, directions, paths for route <r> for agency <a>
http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=<a>&r=<r>

predictions for stop <s> for agency <a>
http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=<a>&stopId=<s>

predictions for route <r> at stop <s> for agency <a>
http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=<a>&stopId=<s>&routeTag=<r>
