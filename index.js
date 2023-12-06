// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const db=require("")

// implementation
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// end-point menambahkan data pelanggaran siswa 


app.post("/pelanggaran_siswa", (req,res) => {
    // prepare data to pelanggaran_siswa
    let data = {
        id_siswa: req.body.id_siswa,
        id_user: req.body.id_user,
        waktu: moment().format('YYYY-MM-DD HH:mm:ss') // get current time
    }


    // parse to JSON
    let pelanggaran = JSON.parse(req.body.pelanggaran)


    // create query insert to pelanggaran_siswa
    let sql = "insert into pelanggaran_siswa set ?"


    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        
        if (error) {
            res.json({message: error.message})
        } else {
            
            // get last inserted id_pelanggaran
            let lastID = result.insertId


            // prepare data to detail_pelanggaran
            let data = []
            for (let index = 0; index < pelanggaran.length; index++) {
                data.push([
                    lastID, pelanggaran[index].id_pelanggaran
                ])                
            }


            // create query insert detail_pelanggaran
            let sql = "insert into detail_pelanggaran_siswa values ?"


            db.query(sql, [data], (error, result) => {
                if (error) {
                    res.json({message: error.message})
                } else {
                    res.json({message: "Data has been inserted"})
                }
            })
        }
    })
})

