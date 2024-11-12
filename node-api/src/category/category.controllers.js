const cateModel = require('./category.models');
const randtoken = require('rand-token').generator();

exports.getCategories = async (req, res) => {
    try {
        const categoriesData = await cateModel.getCate();
        if (categoriesData !== null) {
            res.json(categoriesData);
        } else {
            res.status(404).json({ message: 'Categories not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getCategoriesLimit = async (req, res) => {
    try {
        const { pageNumber = 1, limit = 10 } = req.params;
        const { search = "" } = req.query;
        const categoriesData = await cateModel.getPaginatedCateWithDetails(pageNumber, limit, search);

        if (categoriesData !== null) {
            res.json(categoriesData);
        } else {
            res.status(404).json({ message: 'Categories not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getCategoriesId = async (req, res) => {
    try {
        const id = req.params.id;
        const cateDetail = await cateModel.getCategoryById(id)

        if (cateDetail !== null) {
            res.json(cateDetail);
        } else {
            res.status(404).json({ message: 'Categories not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
};

exports.createCate = async (req, res) => {
    try {
        const id = randtoken.generate(16);
        const Cate = { id, ...req.body };
        const status = await cateModel.createCate(Cate);

        if (status) {
            res.status(201).json({ message: 'Category created successfully' });
        } else {
            res.status(500).json({ message: 'Failed to create category' });
        }
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteCateById = async (req, res) => {
    try {
        const id = req.body.id;

        const status = await cateModel.deleteById(id);

        if (status) {
            res.status(201).json({ message: 'Category deleted successfully' });
        } else {
            res.status(500).json({ message: 'Failed to delete category' });
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}