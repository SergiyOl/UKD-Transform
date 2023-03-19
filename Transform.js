const fs = require("fs")
const { Transform } = require("stream")

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        let words = chunk.toString().split(' ')
        for (i = 0; i < words.length; i++){
            words[i] = words[i].split('')
            words[i][0] = words[i][0].toUpperCase()
            words[i] = words[i].join('')
        }
        chunk = words.join(' ')
        this.push(chunk)
        callback()
  },
});

const filePath = "Text.txt"
const writePath = "UpperCaseText.txt"

const rStream = fs.createReadStream(filePath, "utf8")

let data = ""
upperCaseTransform.on("data", (chunk) => {
  data += chunk
});

const wStream = fs.createWriteStream(writePath, "utf8")
rStream.pipe(upperCaseTransform).pipe(wStream)

upperCaseTransform.on("end", () => {
  console.log(`Текст успішно змінено та записано в в файл: ${writePath}`)
})