const HTML_TEMPLATE = (body, subject) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Aldhmari Medai</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 80%;
            margin: 20px auto;
            border: 1px solid #ccc;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h3 {
            color: #CC9600;
            font-size: 25px;
            text-align: center;
          }
          p {
            color: #333;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h3>${subject}</h3>
          <div>
            <div>
              <p>${body}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = HTML_TEMPLATE;
