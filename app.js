const express = require("express")
const path = require("path")
const app = express()
const mongoose = require("mongoose")

const mailer = require("nodemailer")

const { log } = require("console")

const bp = require("body-parser")

app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))


mongoose.connect("mongodb+srv://REVAMPEDMUSIC:REVAMPEDMUSIC@cluster0.3riocwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const Regiters = mongoose.Schema({
   name: String,
   message: String,

})

const RegiteredUser = mongoose.model("revampedmusic", Regiters)

const transporter = mailer.createTransport({
   service: "gmail",
   auth: {
      user: "wisdomsamuel349@gmail.com",
      pass: "hgtd wscf bywx gcrj"
   }
})

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/views/index.html")
})

app.post("/", async (req, res) => {
   try {

      const { name, message } = req.body
      const CheckPoint = await RegiteredUser.exists({ email })
      if (CheckPoint) {
         res.status(200).send("USER ALREADY EXIST")
      } else {
         const user = await RegiteredUser.create({ name, message })
         log(user)
         res.send("THANK YOU FOR REGISTERING,PLEASE CHECK YOUR EMAIL...")


         const mailOpts = {
            from: "ebubeb14@gmail.com",
            to: email,
            subject: "Blessing Beading",
            html: `
                <div style="width:100%;height:100%;font-weight:bolder;background:rgba(0,0,0,.9);color:#fff;">
                     <h1 style="color:#fff;font-family:fantasy;"> Blessing <span style="color:steelblue;font-family:cursive;">Beading</span></h1>
                      
                      <div style="width:100%;height:fit-content;padding:2em 0;display:flex;flex-diection:column;justify-content:center;align-items:center;">
                         ${email}
                      </div>
 
                      <div> 
                        <p style="margin-top:1em;margin-bottom:1em;font-size:1.2em;"> Thank you for contacting, we will get back to you... </p>
                         <div style="width:100%;height:fit-content;style:"border-radius:.5em;"> <img src="https://img.freepik.com/premium-photo/handcraft-accessories_678602-90.jpg?w=740"></div>
                      </div>

                      <div>
                         <p> Your contact was quite successfull! </p>
                         <h1 style="margin-top:1em;margin-bottom:1em;color:cornflowerblue;">Get a new Look ...</h1>

                        <p style="color:slategrey;font-family:fantasy;"> 
                        We are essentially capable of giving you the exact and latest beading design you ever think of on your
                        outfit.
                        We create unique mind-blowing patterns </p>
                      </div>
                      
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

      }

   } catch (error) {
      console.log(error)
   }
})

app.get("/rgmca/registeration/process", (req, res) => {
   res.sendFile(__dirname + "/view/regprocess.html")
})

app.listen(3000, () => {
   console.log("SERVER CONNECTED")
})
