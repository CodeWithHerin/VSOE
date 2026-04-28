const https = require('https');

const urls = [
    'https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg',
    'https://images.pexels.com/photos/1758671/pexels-photo-1758671.jpeg',
    'https://images.pexels.com/photos/1125208/pexels-photo-1125208.jpeg'
];

urls.forEach(url => {
    https.get(url, (res) => {
        console.log(`${url} => ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(e);
    });
});
