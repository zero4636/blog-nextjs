const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data.json');
const db = lowdb(adapter);

const TABLENAME = 'categories';

exports.TABLENAME = TABLENAME;

exports.getCate = async () => {
  try {
    const data = await db.get(TABLENAME).cloneDeep().value();
    return data;
  } catch (error) {
    console.error('Error while getting data:', error);
    return null;
  }
};

exports.getPaginatedCateWithDetails = async (pageNumber, limit) => {
  try {
    const categories = await db.get(TABLENAME).cloneDeep().value();
    const totalCategories = categories.length;

    const startIndex = (pageNumber - 1) * limit;
    const endIndex = startIndex + limit;

    // Slice the categories array to get the desired page of categories
    const paginatedCategories = categories.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalCategories / limit)
    const prevPage = (pageNumber < totalPages) ? (pageNumber + 1) : null;

    //   return categories;
    return {
      pagination: {
        totalCategories,
        totalPages: totalPages,
        currentPage: parseInt(pageNumber),
        prevPage: prevPage
      },
      categories: paginatedCategories,
    };
  } catch {
    console.error('Error while getting data:', error);
    return null;
  }
};

// Suppose you want to retrieve a category by its ID (assuming the ID is stored in a field called 'id').
exports.getCategoryById = async (categoryId) => {
  try {
    const category = db.get(TABLENAME).cloneDeep().find({ id: categoryId }).value();
    return category;
  } catch (error) {
    console.error('Error while getting category by ID:', error);
    return null;
  }
};


// Create cate
exports.createCate = async cate => {
  try {
    await db.get(TABLENAME).push(cate).write();
    return true;
  } catch (error) {
    console.error('Error creating category:', error);
    return false;
  }
};

// Remove cate

exports.deleteById = async (categoryId) => {
  try {
    const categoryIndex = db.get('categories').cloneDeep().find({ categoryId }).value();

    if (categoryIndex === -1) {
      return false;
    }

    db.get(TABLENAME).splice(categoryIndex, 1).write();
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
}