const express = require('express')
const router = express.Router()

// import database
const koneksi = require('../config/database')

// insert data & validasi
const {body, validationResult} =require('express-validator')


// membaca data
router.get('/', function(req,res){
    koneksi.query('SELECT * FROM posts ORDER BY id_hero desc',
    function(error,rows){
        if(error){
            return res.status(500).json({
                status: false,
                message: 'error sahabat',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'berhasil cuy >_<',
                data:rows
            })
        }    
    })
})

//insert data
router.post('/hero',
    [
        body('nama_hero').notEmpty(),
        body('role_hero').notEmpty(),
        body('jenis_skill').notEmpty(),
        body('jarak_serangan').notEmpty(),
        body('sub_role').notEmpty(),
    ],(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()})
        }

        //mendefinisikan formData
        let formData = {
            nama_hero: req.body.nama_hero,
            role_hero: req.body.role_hero,
            jenis_skill: req.body.jenis_skill,
            jarak_serangan: req.body.jarak_serangan,
            sub_role: req.body.sub_role,
        }

        //masukkan data / query
        koneksi.query('INSERT INTO posts SET ?', formData,
            function(err,rows){
                if(err){
                    return res.status(500).json({
                        status: false,
                        message: 'error sahabat',
                    })
                }else{
                    return res.status(201).json({
                        status: true,
                        message: 'berhasil cuy >_<',
                        data: rows[0]
                    })
                }
            }
        )
    })

//Detail
router.get('/:id', function(req,res){
    let id = req.params.id

    koneksi.query(`SELECT * FROM posts WHERE ID=${id}`,
        function(error, rows){
            if(error){
                return res.status(500).json({
                    status:false,
                    message:'error sahabat'
                })
            }

            //pencarian posts
            if(rows.length <= 0){
                return res.status(404).json({
                    status: false,
                    message: 'data tidak ada !!!'
                })
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'berhasil cuy >_<',
                    data: rows[0],
                })
            }
        }
     )

})

// Update
router.patch('/update/:id',[
    //validasi
    body('nama_hero').notEmpty(),
    body('role_hero').notEmpty(),
    body('jenis_skill').notEmpty(),
    body('jarak_serangan').notEmpty(),
    body('sub_role').notEmpty(),
],(req,res)=>{
    const errors = validationResult (req)
    if(!errors.isEmpty()){
        return res.status(442).json({
            errors:errors.array()
        })
    }

    //id
    let id = req.params.id

    //data post
    let formData={
        nama_hero: req.body.nama_hero,
        role_hero: req.body.role_hero,
        jenis_skill: req.body.jenis_skill,
        jarak_serangan: req.body.jarak_serangan,
        sub_role: req.body.sub_role,
    }

    // update query
    koneksi.query(`UPDATE posts set ? WHERE id_hero=${id}`,
       formData,function(error,rows){
        if(error){
            return res.status(500).json({
                status: false,
                message: 'error sahabat',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'berhasil cuy >_<'
            })
        }
       } 
    )
})

//Delete
router.delete('/delete/(:id)',
    function(req,res){
        let id = req.params.id

        koneksi.query(`DELETE FROM posts WHERE id_hero=${id}`,
            function(error,rows){
                if(error) {
                    return res.status(500).json({
                        status: false,
                        message: 'error sahabat'
                    })
                } else {
                    return res.status(200).json({
                        status: true,
                        message: 'berhasil cuy >_<'
                    })
                }
            }
        )
    })

module.exports = router