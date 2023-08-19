apt update && apt upgrade -y
apt install screen -y
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
apt-get install -y nodejs
apt install unrar -y
apt install python3 -y
apt install unzip -y

wget https://cdn.discordapp.com/attachments/1097785438212726886/1097785460388016168/LAYER7.rar

unrar x LAYER7.rar
node scrape.js

npm i randomstring
npm i user-agents
npm i request
npm i user-agent
npm i cloudscraper
npm i header-generator
npm i fake-useragent