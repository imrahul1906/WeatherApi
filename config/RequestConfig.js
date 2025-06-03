import dotenv from "dotenv"
dotenv.config()


export const requestConfig = (path, data1 = null, data2 = null) => {
    const basePath = path;
    const additionalData = [];
    if (data1) additionalData.push(data1);
    if (data2) additionalData.push(data2);

    const url = `${basePath}/${additionalData.join('/')}`;
    console.log(url);
    return {
        'method': 'get',
        url,
        'params': {
            'key': process.env.API_KEY
        }
    }
}