const express = require('express')
const app = express()
const port = 3000
// import body parser
const bodyParser = require('body-parser')


app.get('/',(req,res) =>{
    const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>API Hero Mobile Legend</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
                color: black; /* Mengubah warna teks agar kontras dengan latar belakang */
            }
            h1 {
                color: black; /* Warna teks untuk judul */
            }
            button {
                padding: 10px 20px;
                font-size: 16px;
                color: white;
                background-color: #007bff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            button:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <h1>Sugeng Rawuh Ing API Hero Mobile Legend</h1>
        <p>Klik tombol ing ngisor iki kanggo ngakses dhaptar pahlawan:</p>
        <button onclick="window.location.href='/api/posts'">Waca Daftar Pahlawan</button>
    </body>
    </html>
    `;
    res.send(html);
})

//insert, edit, delete
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//import route post
const postsRouter = require('./routes/posts')
app.use('/api/posts', postsRouter)


app.listen(port,()=>{
    console.log(`aplikasi ini berjalan di http://localhost:${port}`)
})