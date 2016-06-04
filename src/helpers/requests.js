import fetch from 'isomorphic-fetch';

export function get(url) {
  return fetch(url)
      .then(r => r.ok
        ? Promise.resolve(r)
        : Promise.reject(new Error(`${r.status} error.`))
      ).then(r => r.text())
      .catch(e => {
        console.log('ERROR:', e.message);
        return Promise.reject(e);
      })
    ;
}
