const db = require("../../data/db-config");

const getAll = () => {
  const result = db("accounts");
  return result;
};

const getById = (id) => {
  return db("accounts").where("id", id).first();
};

const create = async (account) => {
  account.name = account.name.trim();
  const newAccountId = await db("accounts").insert(account);
  const result = await getById(newAccountId[0]);
  return result;
};

const updateById = async (id, account) => {
  await db("accounts").where("id", id).update(account);
  const result = await getById(id);
  return result;
};

const deleteById = async (id) => {
  const deleteId = getById(id);
  await db("accounts").where("id", id).del();
  return deleteId;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
