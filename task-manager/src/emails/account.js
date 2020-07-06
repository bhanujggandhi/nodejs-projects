const sgMail = require("@sendgrid/mail");

const sendgridAPIKey =
  "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";

sgMail.setApiKey(sendgridAPIKey);

sgMail
  .send({
    to: "gandhibhanuj@gmail.com",
    from: "task-app@bhanujgandhi.tech",
    subject: "This is my first creation",
    text: "I hope this one actually gets to you",
  })
  .then(() => {
    console.log("sent");
  })
  .catch((err) => {
    console.log(err);
  });
