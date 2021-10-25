const csvtojsonV2=require("csvtojson");
const axios = require('axios').default
const fs = require('fs')
const Path = require('path')
const csvfilepath = './files/spisok.csv'
const dada = Path.resolve(__dirname, 'files', 'spisok.json')
const s =[]


//Запрос и скачивание файла файла в csv
async function download() {
    const url = 'https://kiraind.ru/leadball-test/orders'
    const path = Path.resolve(__dirname, 'files', 'spisok.csv')
    const response = await axios({
        method: 'GET',
        url: url,
        auth: {
            username: 'nsspb',
            password: 'nsspb'
        },
        responseType: 'stream'
    })

    response.data.pipe(fs.createWriteStream(path))
    return new Promise((resolve, reject) => {
        response.data.on('end', () => {
            resolve()
        })
        response.data.on('error', err => {
            reject(err)
        })
    })
}  download()


//конвертация csv в js объект
csvtojsonV2()
.fromFile(csvfilepath)
.then((json)=>{
    // console.log(json);
    fs.writeFileSync("spisokJS.js", JSON.stringify(json), "utf-8", (err) => {
        if (err) console.log(err)
    })
})

//Дальше

