const express = require('express');
const router = express.Router();
const FavoriteController = require('../controllers/FavoriteController');

router.post('/add', FavoriteController.addFavorite);
router.get('/:student_id', FavoriteController.getFavorite);
router.delete('/remove', FavoriteController.removeFavorite);

module.exports = router;