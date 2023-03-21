const Account = require("./accounts-model");
const db = require("../../data/db-config");

async function checkAccountPayload(req, res, next) {
  const { name, budget } = req.body;
  const error = { status: 400 };
  if (name === undefined || budget === undefined) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (typeof budget !== "number" || isNaN(budget)) {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    next();
  }
}

async function checkAccountNameUnique(req, res, next) {
  try {
    const checkName = await db("accounts")
      .where("name", req.body.name.trim())
      .first();

    if (checkName) {
      res.status(400).json({ message: "that name is taken" });
    }
  } catch (err) {
    next(err);
  }
}

async function checkAccountId(req, res, next) {
  const account = await Account.getById(req.params.id);
  if (!account) {
    next({ status: 404, message: "account not found" });
  } else {
    req.account = account;
    next();
  }
}

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
};
