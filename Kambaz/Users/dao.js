import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

/* Data Access Object (DAO) design pattern organizes data access by grouping it based on data types */
// Users dao.js implements various CRUD operations for handling the users array in the Database

// used for sign up operation
export const createUser = async (user) => {
  const newUser = { ...user, _id: uuidv4() };
  return await model.create(newUser);
}

// used for finding users by id, role, name
export const findAllUsers = async () => await model.find();
export const findUserById = async (userId) => await model.findById(userId);

export const findUsersByRole = async (role) => await model.find({ role: role }); 

export const findUsersByPartialName = async (partialName) => {
  const regex = new RegExp(partialName, "i"); 
  return await model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};

// used for sign up operation
export const findUserByUsername = async (username) =>
  await model.findOne({ username: username });

// used for sign in operation
export const findUserByCredentials = async (username, password) =>
  await model.findOne({ username, password });

export const updateUser = async (userId, user) =>
  await model.updateOne({ _id: userId }, { $set: user });

export const deleteUser = async (userId) =>
  await model.deleteOne({ _id: userId });


