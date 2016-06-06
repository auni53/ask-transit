import xpath from 'xpath';
import { DOMParser as dom } from 'xmldom';

export default function parse (xml, query) {
  let doc = new dom().parseFromString(xml, 'text/xml');
  let nodes = xpath.select(query, doc);

  return nodes;
}

