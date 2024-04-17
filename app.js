const express = require("express")
const app = express()
const bp = require("body-parser")
const ejs = require("ejs")
const mailer = require("nodemailer")


const User = require("./model/db")

app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))


const transporter = mailer.createTransport({
   service: "gmail",
   auth: {
      user: "wisdomsamuel349@gmail.com",
      pass: "hgtd wscf bywx gcrj"
   }
})

app.set("view engine", "ejs")

app.get("/", (req, res) => {
   res.render("../views/index")
})

app.get("/admin/confirm", (req, res) => {
   res.render("../views/confirm")
})

app.post("/", async (req, res) => {
   try {
      const { name, email } = req.body

      if (name == "" || email == "") {
         res.redirect("/")
         console.log("Cannot be empty")
      } else {
         const chechExistence = await User.exists({ email })
         console.log(chechExistence)
         if (!chechExistence) {
            const AddUser = await User.create({ name, email })
            console.log(AddUser)

            const mailOpts = {
               from: "wisdomsamuel349@gmail.com",
               to: email,
               subject: "REVAMPED MUSIC",
               html: `
               <div style="width:100%;height:100%;font-weight:bolder;background:rgba(0,0,0,.9);color:#fff;">
                    <h1 style="color:#fff;font-family:fantasy;"> Rythm and <span style="color:steelblue;font-family:cursive;">Lyrics</span></h1>
                     
                     <div style="width:100%;height:fit-content;padding:2em 0;display:flex;flex-diection:column;justify-content:center;align-items:center;">
                        ${email}
                     </div>

                     <p>thank you for signing up... We will get back to you ..... </p>
                     
               </div>`
            }

            transporter.sendMail(mailOpts, (err, data) => {
               if (err) {
                  console.log("ERROR :" + err)
                  // res.json({message:err})
               } else {
                  console.log(data.response)
                  // res.json({message:data.response})
               }
            })


            res.redirect("/admin/confirm")
         } else {
            res.send("User Already Exist")
         }
      }

   } catch (error) {
      console.log(error)
   }
})

app.listen(3000, () => {
   console.log("SERVER RUNNING ON PORT 3000")
})