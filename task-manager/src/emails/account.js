const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "tasker-by-bhanuj@bhanujgandhi.tech",
    subject: "Thanks for joining in!",
    text: `
    Welcome to the family, ${name}!
    
    It turns out, our brains are actually wired to keep us thinking about our unfinished tasks. Handy when you have one thing you need to work on. Not so good when you have 30+ tasks vying for your attention at once.
    
    That’s why the first step to organizing your work and life is getting everything out of your head and onto your to-do list. From there you can begin to organize and prioritize so you know exactly what to focus on and when.

    Yours sincerely,
    Bhanuj Gandhi
    `,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "bhanuj-tasker@bhanujgandhi.tech",
    subject: "Sorry to see you go.",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
