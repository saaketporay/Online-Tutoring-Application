const { Favorite : FavoriteModel } = require('./index')

const Favorite = {

    // add favorite
    addFavorite: async (student_id, tutor_id) => {
        try {
            const newFavorite = await FavoriteModel.create({
                student_id,
                tutor_id
            });
            console.log(newFavorite);
            return newFavorite;
        } catch (err) {
            return err;
        }
    },

    // get all favorites by student id
    getFavorite: async (student_id) => {
        try {
            const favorites = await FavoriteModel.findAll({
                where: {
                    student_id: student_id
                }
            });
            return favorites;
        } catch (err) {
            return err;
        }
    },
    // remove favorite
    removeFavorite: async (student_id, tutor_id) => {
        try {
            const removedFavorite = await FavoriteModel.destroy({
                where: {
                    student_id: student_id,
                    tutor_id: tutor_id
                }
            });
            console.log(removedFavorite)
            return removedFavorite;
        } catch (err) {
            return err;
        }
    }

}

module.exports = Favorite;