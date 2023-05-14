# Qrispiet Quotes
>[Discord](https://discord.com) bot to track messages from users and requote them.

Click here: [Invite Link](https://discord.com/oauth2/authorize?client_id=1106752785803902976&scope=bot&permissions=62981102632928)

## Build Setup
1. Follow [these instructions](https://discordpy.readthedocs.io/en/latest/discord.html) on how to set up a bot with Discord.
2. Retrieve your bot specific client id/token.
3. In the directory DSF-Discord-Bot/Client, copy config.js.TEMPLATE to a new file and add your information.
Example:

``` javascript
module.exports = ( botToken: YOUR_TOKEN_HERE )
```
4. Run the following commands:

``` bash
# install dependencies
npm install

#start Discord bot
start scripts/start_dsf_bot.bat
```
