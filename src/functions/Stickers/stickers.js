
function GetSticker(message) {
  return message.stickers.map(s => s)[0]
}

module.exports = { GetSticker }
