const userModel = require('./users.models');

exports.getAll = async (req, res) => {
    try {
        const usersData = await userModel.getAllUser();
        if (usersData !== null) {
            res.json(usersData);
        } else {
            res.status(404).json({ message: 'Users not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};