export default (body) => {
  return fetch('http://localhost:5000/subscription', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: body
  });
}
