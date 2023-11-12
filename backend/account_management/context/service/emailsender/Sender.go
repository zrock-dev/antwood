package emailsender

import (
	"bytes"
	"net/smtp"
	"text/template"
)


var Headers = "MIME-Version: 1.0\nContent-Transfer-Encoding: 7bit\n" +
"Content-Type: text/html; charset=\"UTF-8\"\n\n" 

func SendEmailVerificationCode( to []string, code string) error{
	auth := smtp.PlainAuth("", "solestyle28@gmail.com", "dgvo hzst lwzo sluu", "smtp.gmail.com")

	var body bytes.Buffer
	t, err := template.ParseFiles("./public/templates/VerificationCodeTemplate.html")
	if err != nil {
		return err
	}

	t.Execute(&body, struct{
		Code string
	}{
		Code: code,
	})


	msg := "Subject: " + "Verification Code for SoleStyle Account" + "\n" + Headers + "\n\n" + body.String()

	err = smtp.SendMail("smtp.gmail.com:587", auth, "solestyle28@gmail.com",to,[]byte(msg))

	if err != nil{
		return err
	}else{
		return nil
	}
}
