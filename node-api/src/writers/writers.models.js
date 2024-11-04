const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data.json');
const db = lowdb(adapter);

const TABLENAME = 'writers';

exports.TABLENAME = TABLENAME;

exports.getAll = async () => {
  try {
    const data = await db.get(TABLENAME).cloneDeep().value();
    return data;
  } catch (error) {
    console.error('Error while getting data:', error);
    return null;
  }
};

exports.getPaginatedWriters = async (pageNumber, limit) => {
    try {
		const writers = await db.get(TABLENAME).cloneDeep().value();
        const totalWriters = writers.length;

        const startIndex = (pageNumber - 1) * limit;
        const endIndex = startIndex + limit;

        // Slice the Writers array to get the desired page of categories
        const paginatedWriters = writers.slice(startIndex, endIndex);

        //   return categories;
        return {
            totalWriters,
            totalPages: Math.ceil(totalWriters / limit),
            currentPage: pageNumber,
            writers: paginatedWriters,
        };
	} catch {
		console.error('Error while getting data:', error);
		return null;
	}
};