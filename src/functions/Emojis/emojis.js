const twemoji = require("twemoji")

function GetEmojis(content, options) {
    let onlyDiscordEmojis = false
    let onlyDefaultEmojis = false

    if (options){
        onlyDiscordEmojis = options.onlyDiscordEmojis ?? false
        onlyDefaultEmojis = options.onlyDefaultEmojis ?? false
    }

    if (typeof onlyDiscordEmojis !== "boolean") throw "onlyDiscordEmojis must either be true or false"
    if (typeof onlyDefaultEmojis !== "boolean") throw "onlyDefaultEmojis must either be true or false"

    if(content.content) content = content.content
    if(typeof content !== 'string') throw `"${content}" is not a string`

    content = content.replace(/></g,'> <')

    let args = content.split(/ +/g)
    let emojis = []

    for(const arg of args){
        let matchDiscordEmoji = arg.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)

        let defaultEmojiReg = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        let matchDefaultEmoji = arg.match(defaultEmojiReg)

        if(matchDiscordEmoji && !onlyDefaultEmojis){
            emojis.push({
                name    : matchDiscordEmoji[0].split(":")[1].split(":")[0],
                id      : matchDiscordEmoji[3],
                animated: matchDiscordEmoji[1] && matchDiscordEmoji[1] === 'a' ? true : false,
                image   : `${
                    (matchDiscordEmoji[1] && matchDiscordEmoji[1] === 'a' ? false : true) === true ?
                    `https://cdn.discordapp.com/emojis/${matchDiscordEmoji[3]}.png?v=1`
                    :
                    `https://cdn.discordapp.com/emojis/${matchDiscordEmoji[3]}.gif?v=1`
                }`,
                type    : "Discord Emoji"
            })
        } else 

        if(matchDefaultEmoji && !onlyDiscordEmojis){
            emojis.push({
                name: matchDefaultEmoji[0],
                id: matchDefaultEmoji[0],
                animated: false,
                image: twemoji.parse(matchDefaultEmoji[0]).split("src=\"")[1].split("\"")[0],
                type: "Default Emoji"
            })
        }
    }

    return emojis

}

module.exports = { GetEmojis }