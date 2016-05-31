import fetch from 'isomorphic-fetch';

export function get(url) {
  return fetch(url)
    .then(r => {
      console.log(r);
      if (r.ok) return Promise.resolve(response);
      else return Promise.reject(response);
    }
  );
}
