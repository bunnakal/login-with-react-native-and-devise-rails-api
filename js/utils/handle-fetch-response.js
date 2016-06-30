export function parseResponse (response) {
  let json = response.json();
  if (response.status >= 200 && response.status < 300) {
    console.log('Response from util :', response)
    return json;
  } else {
    return json.then(err => Promise.reject(err));
  }
}