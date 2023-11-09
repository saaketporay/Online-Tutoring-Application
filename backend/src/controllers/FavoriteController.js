const Favorite = require('../models/Favorite');
const jwtUtil = require('../utils/jwtUtil');

const FavoriteController = {

    // add favorite
    addNewFavorite: async (req, res) => {
        const token = req.headers.authorization;
        const decodedToken = jwtUtil.decodeToken(token);

        const student_id = decodedToken.id;
        const { tutor_id } = req.body;
        //console.log(student_id, tutor_id);
        try {
            const newFavorite = await Favorite.addFavorite(student_id, tutor_id);
            console.log(newFavorite);
            return res.status(200).json(newFavorite);
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ success: false, error: 'Internal Server Error' });
        }
    },

    // get all favorites by student id
    getFavoriteByStudentId: async (req, res) => {
        const token = req.headers.authorization;
        const decodedToken = jwtUtil.decodeToken(token);
        const student_id = decodedToken.id;

        try {
            const favorites = await Favorite.getFavorite(student_id);
            return res.status(200).json(favorites);
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ success: false, error: 'Internal Server Error' });
        }
    },

    // remove favorite

    removeFavorite: async (req, res) => {
        const token = req.headers.authorization;
        const decodedToken = jwtUtil.decodeToken(token);
        const student_id = decodedToken.id;
        
        const { tutor_id } = req.body;
        try {
            const removedFavorite = await Favorite.removeFavorite(student_id, tutor_id);
            return res.status(200).json(removedFavorite);
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ success: false, error: 'Internal Server Error' });
        }
    }
}

module.exports = FavoriteController;