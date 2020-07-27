const db = require('../database/connection');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
};

function find() {
  return db('users').select('id', 'email').orderBy('id');
}

function findBy(filter) {
  return db('users').where(filter);
  // .select('id', 'email')
  // .orderBy('id');
}

async function add(user) {
  try {
    const [id] = await db('users').insert(user, 'id');

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db('users').where({ id }).first();
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db('users').where('id', Number(id)).del();
}
