import { Request, Router } from "express"
import nodemailer from "nodemailer"

const router = Router()

type ContactType = {
  email: string,
  message: string
}

type PostType = Request<{}, any, ContactType>

router.post("/", async (req: PostType, res) => {
  const {email, message} = req.body

  if(email.length < 5 || message.length === 0)
    res.send(400).json('fail')

  const smtp = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  })

  const mail = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: 'Message from contact form',
    text: `${email}:\n ${message}`
  }

  smtp.sendMail(mail, (err) => {
    if(err) 
      res.status(400).json('fail')
    else 
      res.status(200).json('success')
  })
})

export default router