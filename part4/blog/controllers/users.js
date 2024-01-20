import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const createUser = async (request, response) => {
  const { password, name, username } = request.body;

  if (!password.trim() || password.length < 3) {
    return response
      .status(400)
      .json({ error: 'Please provide a password with at least 3 characters' });
  }

  const salRounds = 10;
  const passwordHash = await bcrypt.hash(password, salRounds);

  const user = new User({ name, username, passwordHash });

  const savedUser = await user.save();

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(201)
    .json({ token, username: savedUser.username, name: savedUser.name });
};

export const getAllUsers = async (_request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  });

  response.status(200).json(users);
};
