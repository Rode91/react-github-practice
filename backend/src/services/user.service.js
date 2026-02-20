const userModel = require('../models/user.model');
const AppError = require('../errors/AppError');

const getAllUsers = async () => {
  return await userModel.getAllUsers();
};

const createUser = async (user) => {
  const { name, email } = user;

  // verificar si el email ya existe
  const existingUser = await userModel.findByEmail(email);
  if (existingUser) {
    throw new AppError('Email already exists', 400);
  }

  
  if (!name || !email) {
    throw new Error('Name and email are required',400);
  }

  if (!email.includes('@')) {
    throw new AppError('Email is ivalid', 400);
  }
  
  const id = await userModel.createUser(name, email);

  return {
    id,
    name,
    email
  };
};



module.exports = {
  getAllUsers,
  createUser
};
