const nodemailer = require('nodemailer');
const { emailConfig } = require('../../../config/vars');
const Email = require('email-templates');
const smtpTransport = require('nodemailer-smtp-transport')
// SMTP is the main transport in Nodemailer for delivering messages.
// SMTP is also the protocol used between almost all email hosts, so its truly universal.
// if you dont want to use SMTP you can create your own transport here
// such as an email service API or nodemailer-sendgrid-transport

// const transporter = nodemailer.createTransport({
//   port: emailConfig.port,
//   host: emailConfig.host,
//   auth: {
//     user: emailConfig.username,
//     pass: emailConfig.password,
//   }, 
//   secure: false, // upgrades later with STARTTLS -- change this based on the PORT
// });

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    auth: {
      user: emailConfig.username,
      pass: emailConfig.password,
    },
    secure: false, // upgrades later with STARTTLS -- change this based on the PORT
  })
);

// verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.log('error with email connection');
    console.log(error);
  }
});

exports.sendPasswordReset = async (passwordResetObject) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: "noreply.awesomechat@gmail.com",
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: "passwordReset",
      message: {
        to: passwordResetObject.userEmail,
      },
      locals: {
        productName: "Awesome Chat",
        // passwordResetUrl should be a URL to your app that displays a view where they
        // can enter a new password along with passing the resetToken in the params
        passwordResetUrl: `http://chat.manhpham.xyz/new-password?resetToken=${passwordResetObject.resetToken}&email=${passwordResetObject.userEmail}`,
      },
    })
    .catch((error) => {
      console.log("error sending password reset email");
      console.log(error)
    });
};

exports.sendPasswordChangeEmail = async (user) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: "noreply.awesomechat@gmail.com",
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: 'passwordChange',
      message: {
        to: user.email,
      },
      locals: {
        productName: 'Awesome Chat',
        name: user.name,
      },
    })
    .catch(() => {
      console.log("error sending change password email");
      console.log(error);

    });
};
