const db = require('../database/connection');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUserId,
  update,
  remove,
};

function find() {
  return db('features').select('*').orderBy('id');
}

function findBy(filter) {
  return db('features').where(filter);
}

async function add(listing) {
  try {
    const [id] = await db('features').insert(listing, 'id');

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db('features').where({ id }).first();
}

function findByUserId(id) {
  return db('users as u')
    .where('userId', id)
    .join('features as f', 'u.id', 'f.userId')
    .select('*');
}

function update(id, changes) {
  return db('features')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db('features').where('id', Number(id)).del();
}
