const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const app = express()

const port = 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())


const db = require("./koneksi")

app.get("/", (req,res)=>{
    let sql = "select * from pelanggaran"
    db.query(sql, (error, result)=>{
        let respon = null
        if(error){
            respon = {
                message: error.message
            }
        }
        else{
            respon = {
                count: result.length,
                pelanggaran: result
            }
        }
        res.json(respon)
    })
})

app.get("/:id", (req,res)=>{
    let data = {
        id_pelanggaran_siswa: req.params.id
    }
    let sql = "select * from pelanggaran where ?"
    
    db.query(sql, data, (error, result) =>{
        let respon = null
        if(error){
            respon = {
                message: error.message
            }
        }
        else{
            respon = {
                count: result.length,
                pelanggaran: result
            }
        }
        res.json(respon)
    })
})

app.post("/", (req,res)=>{
    let data = {
       nama_pelanggaran: req.body.nama_pelanggaran,
       poin: req.body.poin
    }
    let sql = "insert into pelanggaran set ?"
    
    db.query(sql, data, (error, result)=>{
        let respon = null
        if(error){
            respon = {
                message: error.message
            }
        }
        else{
            respon = {
                message: result.affectedRows + "data inserted"
            }
        }
        res.json(respon)
    })
})


app.put("/", (req, res)=>{
    let data = [{
        nama_pelanggaran: req.body.nama_pelanggaran,
        poin: req.body.poin
    },
    {
        id_pelanggaran: req.body.id_pelanggaran
    }]
    
    let sql = "update pelanggaran set ? where ?"
    db.query(sql, data, (error,result)=>{
        let respon = null
        if(error){
            respon = {
                message: error.message
            }
        }
        else{
            respon = {
                message: result.affectedRows + "data updated"
            }
        }
        res.json(respon)
    })
})

app.delete("/:id", (req, res)=>{
    let data = {
        id_pelanggaran: req.params.id
    }
    let sql = "delete from pelanggaran where ?"
    db.query(sql, data, (error, result)=>{
        if(error){
            respon = {
                message: error.message
            }
        }
        else{
            respon = {
                message: result.affectedRows + "data deleted"
            }
        }
        res.json(respon)

    })
})


module.exports = app
