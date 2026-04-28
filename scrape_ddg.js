const https = require('https');

function searchDDG(query) {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent('site:pexels.com/photo/ ' + query)}`;
    
    https.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const matches = data.match(/pexels\.com\/photo\/[a-z0-9-]+-(\d+)/g);
            if(matches) {
                const unique = [...new Set(matches)];
                console.log(`[${query}] found:`);
                unique.slice(0,2).forEach(m => {
                    const id = m.split('-').pop();
                    console.log(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920`);
                });
            } else {
                console.log(`[${query}] no matches`);
            }
        });
    }).on('error', console.error);
}

const queries = [
    "Swiss Alps train", "Paris street", "Vintage train interior", 
    "Luxury bedroom", "Fine dining restaurant", "Venice canal",
    "Istanbul mosque", "London Big Ben", "Champagne pouring"
];

queries.forEach(q => searchDDG(q));
