const { Router } = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const asyncRoute = require('../utils/async-route');

const router = Router();
router.use(bodyParser.json());
router.use(passport.authenticate('bearer', { session: false }));

router.post('/', asyncRoute(async (req, res) => {
  res.json(req.body);
}));

module.exports = router;
