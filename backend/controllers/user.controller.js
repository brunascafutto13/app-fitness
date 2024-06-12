const db = require("../models");
const User = db.user;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hash
    });

    res.status(201).send({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Senha incorreta." });
    }

    const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: '24h' });

    res.status(200).send({
      user: {
        id: user.id,
        email: user.email
      },
      token
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
