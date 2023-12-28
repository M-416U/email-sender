const express = require("express");
const SENDMAIL = require("./mail/mailer");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.post("/api/send-mail", async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    const errors = [];

    if (!to) {
      errors.push({
        field: "to",
        error: "Bad Request",
        message: "'to' field is required",
        code: 400,
      });
    }
    if (!body) {
      errors.push({
        field: "body",
        error: "Bad Request",
        message: "'body' field is required",
        code: 400,
      });
    }

    if (errors.length > 0) {
      return res.json({ success: false, errors: errors, code: 400 });
    }

    await SENDMAIL(
      {
        from: "support@aldhamrimedia.com",
        to: to,
        subject: subject,
        body: body,
      },
      (info) => {
        console.log("info", info);
      }
    ).catch((err) => {
      return res.status(500).json("error", err);
    });

    return res.json({
      success: true,
      errors: null,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error });
  }
});

app.listen(port, () => {
  console.log(
    `Server is running on port ${port} \n entry http://localhost:${port}`
  );
});
