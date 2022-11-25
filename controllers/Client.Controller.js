const jwt = require('jsonwebtoken');
var validation = require('./ValidateSchema/validation.js');
var {ErrorHandler} = require('../midelleware/ErrorHandler.js')
var bcrypt = require('bcrypt');
var fs = require('fs');
const multer = require('multer');
const mysql = require("../database/dbServer");
var SqlString = require('sqlstring');
const { PDFDocument, StandardFonts, rgb , degrees } = require("pdf-lib");
const { writeFileSync, readFileSync } = require("fs");





const storage = multer.diskStorage({
 
  destination: (req, file, cb) => {
     cb(null,  __basedir + '/uploads/identites')
      },
  filename: (req, file, cb) => {
      
              //cb(null,new Date().toISOString() + file.originalname);
              cb(null, `${file.fieldname}_${new Date().toISOString().replace(/:/g,'-')}_${file.originalname}`)
          }

});
const fileFilter=(req, file, cb)=>{
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png"  || file.mimetype === "application/pdf") {
      cb(null, true)
  } else {
      cb({message:'STP rentrez une image!'}, false)
  }
}

var upload = multer();
var upload = multer({
  storage: storage,
   limits: {
      fieldSize: 1024 * 1024 * 5
   },
 // fileFilter: fileFilter
  
});
//Upload Single Image
//upload.array('photo', 3)
let showImageSingle = upload.single('photo')
//upload.array('photo', 3);

  
  // Login with My Sql
  const Login = async (req, res, next) => {
  let {email , password} = req.body;
  console.log(req.body);
	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
    mysql.getConnection( async (err, connection) => {
      if (err) throw (err)
      console.log('test');

      const authQuery =  SqlString.format('SELECT * FROM clients WHERE email = ?', [email]);
		await connection.query(authQuery, async (error, result)=> {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (result.length > 0) {
        console.log(result[0]);
				// Authenticate the user
        const comparison = await bcrypt.compare(password, result[0].password)          
        if(comparison){              
                let token = jwt.sign(
                  { client: result },
                  process.env.TOKEN_SUCRET,
                  { expiresIn: '7d' }
                )
                res.status(201).json({
                  user_token: {
                  client: result,
                    token: token,
                    expire_in: '7d'
                  }
                })         
          }else{     
            let err = new ErrorHandler('login error', 403, 'invalid_field', { message: "L\'e-mail et le mot de passe ne correspondent pas"})
          return next(err)       
                
          }      
			} else {
        let err = new ErrorHandler('login error', 403, 'invalid_field', { message: "L\'e-mail et le mot de passe ne correspondent pas" })
          return next(err)
        }			
		})
  })
	} else {
    let err = new ErrorHandler('login error', 403, 'invalid_field', { message: "Veuillez entrer le nom d'utilisateur et le mot de passe" })
    return next(err)
	}
  }


  // Check user Existing or not
 
  
//
let getClientById = async function(req, res, next) {
  const {id} = req.params;
  mysql.getConnection( async (err, connection) => {
    if (err) throw (err)
    const search_query = SqlString.format('SELECT * FROM clients WHERE id=?',[id]);
    await connection.query (search_query, async (err, result) => {
      connection.release()
      if (err) throw (err)
      console.log ("--------> Search User")
      console.log(result.id)
      res.json({ user: result })
  })
})
}

// update user
let UpdateClient = async (req, res, next)=> {
  const {id} = req.params;
  const {Nom, Prenom} = req.body;
  mysql.getConnection( async (err, connection) => {
    if (err) throw (err)
    const search_query = SqlString.format("UPDATE clients SET Nom = ?, Prenom = ? WHERE id = ?",[Nom, Prenom ,id]);
    await connection.query (search_query, async (err, result) => {
      connection.release()
      if (err) throw (err)
      console.log ("--------> Update Client")
      console.log(result.id)
      res.json({ user: result })
  })
})
}

// Delete user
let DeleteClient = async (req, res, next)=> {
  const {id} = req.params;
  mysql.getConnection( async (err, connection) => {
    if (err) throw (err)
    const search_query = SqlString.format("DELETE FROM clients WHERE id = ?",[id]);
    await connection.query (search_query, async (err, result) => {
      connection.release()
      if (err) throw (err)
      console.log ("--------> Supprimer Client")
      console.log(result.id)
      res.json({ user: result })
  })
})
}

// Check user Exist Or no
// const check_User= async(req, res, next) => {
//   let {Nom , Prenom , email} = req.body;

//   mysql.getConnection( async (err, connection) => {
//     if (err) throw (err)
//     const search_query = SqlString.format('SELECT * FROM clients WHERE email=?',[email]);
   
//     // ? will be replaced by values
//     // ?? will be replaced by string
//     await connection.query(search_query, async (err, result) => {
//      if (err) throw (err)
//      console.log("------> Search Results")
//      console.log(result.length)
//      if (result.length != 0) {
//       connection.release()
//       let err = new ErrorHandler('signin error', 409, 'invalid_field', {
//         message: "le client deja existe"
//       })
      
//       return next(err)
//      } else {
//       res.json({valid:'Sucess'});
//      } 
// }
//   )
// })
// }
// const Register = async (req, res, next ) => {
//   const {Genre, Nom, Prenom, email, password, adress, telephone, code_postal, date_naissance, Etat_civile, enfant_acharge, child_item, assurance } = req.body;
//   const file =`${Nom}-${Prenom}_${new Date().toISOString().replace(/:/g,'-')}_.pdf`;
//      // lchild_item = child_item && JSON.parse(child_item),
//         // lassurance = assurance && JSON.parse(assurance);

//   const document = await PDFDocument.load(readFileSync((`./uploads/Hestia_file.pdf`)));
//   const path = `./uploads/pdfs/${file}`;
     
//   try {
//   //  

//      writeFileSync(path, await document.save());
//       mysql.getConnection( async (err, connection) => {
//       if (err) throw (err)
//       const hashedPassword = await bcrypt.hash(req.body.password,10);
//       const insert_query = SqlString.format('INSERT INTO clients(Genre, Nom, Prenom, email, password, adress, telephone, code_postal, date_naissance, Etat_civile, enfant_acharge, child_item, assurance, identite, pdf_signature) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [Genre, Nom, Prenom, email, hashedPassword, adress, telephone, code_postal, date_naissance, Etat_civile, enfant_acharge, child_item, assurance, req.file.filename, file]);
  
//      await connection.query(insert_query, (err, result)=> {
//      connection.release()
//      if (err) throw (err)
//      console.log ("--------> Created new User")
//      console.log(result.insertId)
//      res.json({ message: 'client créé' })
  
//     })

  
//   }) //end of connection.query()
//     //file exists
  


//   } catch(err) {
//     console.log({err});
//   }

// }
  module.exports = {
      // check_User,
      Login, 
      getClientById,
      showImageSingle,
      // Register,
      DeleteClient,
      UpdateClient
  }