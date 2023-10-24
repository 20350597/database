const { request, response } = require('express');
const usersModel = require('../models/users');
const pool = require('../db');

const listUsers = async (req = request, res = response) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const users = await conn.query(usersModel.getAll);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

const listUserByID = async (req = request, res = response) => {
  const { id } = req.params;
  if (isNaN(id)) {
    res.status(400).json({ msg: `The ID ${id} is invalid` });
    return;
  }

  let conn;

  try {
    conn = await pool.getConnection();
    const [user] = await conn.query(usersModel.getByID, [id]);

    if (!user) {
      res.status(404).json({ msg: `User with ID ${id} not found` });
      return;
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

const addUser = async (req = request, res = response) => {
  const {
    username,
    password,
    email,
    name,
    lastname,
    phonenumber = '',
    role_id,
    is_active = 1,
  } = req.body;

  if (!username || !password || !email || !lastname || !role_id) {
    res.status(400).json({ msg: 'Missing information' });
    return;
  }

  let conn;

  try {
    conn = await pool.getConnection();
    const [usernameExists, emailExists] = await Promise.all([
      conn.query(usersModel.getByUsername, [username]),
      conn.query(usersModel.getByEmail, [email]),
    ]);

    if (usernameExists && Array.isArray(usernameExists) && usernameExists.length > 0) {
      res.status(409).json({ msg: `Username ${username} already exists` });
      return;
    }

    if (emailExists && Array.isArray(emailExists) && emailExists.length > 0) {
      res.status(409).json({ msg: `Email ${email} already exists` });
      return;
    }

    const userAdded = await conn.query(usersModel.addRow, [username, password, email, name, lastname, phonenumber, role_id, is_active]);

    if (userAdded.affectedWows = 0) {
      throw new Error('User not added');
    }

    res.json('User successfully added');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (isNaN(id)) {
    res.status(400).json({ msg: `The ID ${id} is invalid` });
    return;
  }

  let conn;

  try {
    conn = await pool.getConnection();
    const [user] = await conn.query(usersModel.getByID, [id]);

    if (!user) {
      res.status(404).json({ msg: `User with ID ${id} not found` });
      return;
    }

    const [nameExists, emailExists] = await Promise.all([
      conn.query(usersModel.checkNameExists, [name, id]),
      conn.query(usersModel.checkEmailExists, [email, id]),
    ]);

    if (nameExists && Array.isArray(nameExists) && nameExists.length > 0) {
      res.status(409).json({ msg: `Name ${name} already exists for another user` });
      return;
    }

    if (emailExists && Array.isArray(emailExists) && emailExists.length > 0) {
      res.status(409).json({ msg: `Email ${email} already exists for another user` });
      return;
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;



    const updateResult = await conn.query(usersModel.updateUser, [updateData.name, updateData.email, updateData.username, updateData.password, updateData.lastname,updateData.phonenumber, id]);

    if (updateResult.affectedRows === 0) {
      throw new Error('User not updated');
    }

    res.json({ msg: `User with ID ${id} updated successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

const deleteUser = async (req = request, res = response) => {
  let conn;
  const { id } = req.params;

  try {
    conn = await pool.getConnection();
    const userExist = await conn.query(usersModel.getByID, [id]);

    if (!userExist || userExist.is_active == 0) {
      res.status(404).json({ msg: `User with ID ${id} not found` });
      return;
    }

    const userDeleted = await conn.query(usersModel.deleteRow, [id]);

    if (userDeleted.affectedRows == 0) {
      throw new Error('User not deleted');
    }

    res.json({ msg: 'User deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

module.exports = { listUsers, listUserByID, addUser, deleteUser, updateUser };



    //  routes     -     controllers       -     models(BD)
