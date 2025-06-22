export const serverConfig = (location, serverUrl = 'http://127.0.0.1', port = 3000, date1 = null, date2 = null) => {
    const url = `${serverUrl}:${port}/weather`;

    return {
        'method': 'get',
        url,
        'params': {
            location,
            'from': date1,
            'to': date2
        }
    }
}