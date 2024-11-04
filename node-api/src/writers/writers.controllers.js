const authorModel = require('./writers.models');
const randtoken = require('rand-token').generator();

exports.getAll = async (req, res) => {
    try {
        const data = await authorModel.getAll();
        if (data !== null) {
            res.json(data);
        } else {
            res.status(404).json({ message: 'Writers not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getWritersLimit = async (req, res) => {
    try {
        const { pageNumber = 1, limit = 5 } = req.params;
        const writersData = await authorModel.getPaginatedWriters(pageNumber, limit);

        if (writersData !== null) {
            res.json(writersData);
        } else {
            res.status(404).json({ message: 'Writers not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};