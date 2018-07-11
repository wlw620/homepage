export default (body) => {
  let request = new Request('http://localhost:5000/subscription', {
    method: 'POST',
    body: body
  });
  return fetch(request);
}
