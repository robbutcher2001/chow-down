export default (url, payload) => fetch(url, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
        ...payload
    })
});