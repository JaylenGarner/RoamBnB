// backend/routes/index.js
const express = require('express');
const router = express.Router();

// In this test route, you are setting a cookie
// on the response with the name of XSRF-TOKEN to the value
// of the req.csrfToken method's return. Then, you are sending the text,
// Hello World! as the response's body.
router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;
