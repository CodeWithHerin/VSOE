const https = require('https');

async function fetchPexels(query) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'www.pexels.com',
            path: `/search/${encodeURIComponent(query)}/`,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                // Look for images.pexels.com/photos/ID/pexels-photo-ID.jpeg
                const matches = data.match(/https:\/\/images\.pexels\.com\/photos\/\d+\/pexels-photo-\d+\.jpeg/g);
                if (matches && matches.length > 0) {
                    // unique matches
                    const unique = [...new Set(matches)];
                    resolve(unique[0] + '?auto=compress&cs=tinysrgb&w=1920');
                } else {
                    resolve(null);
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function run() {
    const queries = [
        "train", "paris", "venice", "istanbul", "london",
        "swiss alps", "champagne", "fine dining", "luxury bedroom",
        "budapest", "bucharest"
    ];
    for (const q of queries) {
        try {
            const url = await fetchPexels(q);
            console.log(`[${q}] => ${url}`);
        } catch (e) {
            console.error(e);
        }
    }
}

run();
