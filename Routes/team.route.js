const { teamsController } = require('../Controllers/teams.controller');

const router = require('express').Router();
router.get("/", teamsController)
module.exports = router;