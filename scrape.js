const fs = require("fs");
const https = require("https");

const urlList = [
    "https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=all&ssl=all&anonymity=anonymous",
    "https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt",
    "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
    "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt",
    "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt",
    "https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt",
    "https://proxy.test789590.com/"
];

if (fs.existsSync("proxy.txt")) {
    fs.unlinkSync("proxy.txt");
}

let foundProxies = [];

async function fetchProxies(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { timeout: 1000 }, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                const proxies = data.match(/\d+\.\d+\.\d+\.\d+:\d+/g);
                if (proxies) {
                    for (let i = 0; i < proxies.length; i++) {
                        if (foundProxies.includes(proxies[i])) {
                            continue;
                        }

                        foundProxies.push(proxies[i]);
                        fs.appendFileSync("proxy.txt", proxies[i] + "\n");

                        if (foundProxies.length >= 10000) {
                            break;
                        }
                    }
                }
                resolve();
            });
            res.on("error", (error) => {
                console.log(`Failed to fetch proxies from ${url}: ${error.message}`);
                reject(error);
            });
        });
    });
}

async function main() {
    try {
        const shuffledUrls = urlList.sort(() => 0.5 - Math.random());

        for (let i = 0; i < shuffledUrls.length; i++) {
            await fetchProxies(shuffledUrls[i]);
        }

        console.log(`Successfully scanned ${foundProxies.length} proxies`);
    } catch (error) {
        console.log(`An error occurred: ${error.message}`);
    }
}

main();