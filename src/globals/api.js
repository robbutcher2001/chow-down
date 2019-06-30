export default (method, url, payload) => fetch(url, {
    method,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
        ...payload
    })
});