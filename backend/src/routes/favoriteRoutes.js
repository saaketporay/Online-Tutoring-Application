const express = require('express');
const router = express.Router();
const FavoriteController = require('../controllers/FavoriteController');

router.post('/add', FavoriteController.addNewFavorite);
router.get('/:student_id', FavoriteController.getFavoriteByStudentId);
router.delete('/remove', FavoriteController.removeFavorite);

module.exports = router;