
function GetStickers(message) {
  return message.stickers.map(s => `https://cdn.discordapp.com/stickers/${s.id}.${s.format?.toLowerCase()}`)
}


module.exports = { GetStickers }
