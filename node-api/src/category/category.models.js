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

exports.getPaginatedCateWithDetails = async (pageNumber, limit, search = "") => {
  try {
    let categories = await db.get(TABLENAME).cloneDeep().value();

    if (search) {
      categories = categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    const totalCategories = categories.length;
    const startIndex = (pageNumber - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedCategories = categories.slice(startIndex, endIndex);
    const totalPages = Math.ceil(totalCategories / limit)
    const prevPage = (pageNumber < totalPages) ? (pageNumber + 1) : null;

    return {
      pagination: {
        totalCategories,
        totalPages: totalPages,
        limit: parseInt(limit),
        currentPage: parseInt(pageNumber),
        prevPage: prevPage
      },
      searchText: search,
      categories: paginatedCategories
    };
  } catch {
    console.error('Error while getting data:', error);
    return null;
  }
};

exports.getCategoryById = async (categoryId) => {
  try {
    const category = db.get(TABLENAME).cloneDeep().find({ id: categoryId }).value();
    return category;
  } catch (error) {
    console.error('Error while getting category by ID:', error);
    return null;
  }
};

exports.createCate = async cate => {
  try {
    await db.get(TABLENAME).push(cate).write();
    return true;
  } catch (error) {
    console.error('Error creating category:', error);
    return false;
  }
};

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