const { users } = require("../server");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!users.length) {
    return res.status(400).json({
      msg: "Ma'lumot topilmadi",
      variant: "error",
      payload: null,
    });
  }

  res.status(200).json({
    msg: "Barcha foydalanuvchilar",
    variant: "success",
    payload: users,
    total: users.length,
  });
});

router.post("/", (req, res) => {
  const { fname, username, password } = req.body;
  if (!fname || !username || !password) {
    return res.status(400).json({
      msg: "Ma'lumotlarni to'liq  to'ldiring",
      variant: "error",
      payload: null,
    });
  }

  let index = users.find((user) => user.username === username);

  if (index) {
    res.status(400).json({
      msg: "Bu username band",
      variant: "warning",
      payload: null,
    });
  }

  const newUser = {
    id: new Date().getTime(),
    fname,
    username,
    password,
  };

  users.push(newUser);

  res.status(201).json({
    msg: "Foydalanuvchi  qo'shildi",
    variant: "success",
    payload: newUser,
  });
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let index = users.find((user) => user.id === parseInt(id));
  let existUser = users.findIndex((user) => user.id === parseInt(id));
  if (existUser < 0) {
    return res.status(400).json({
      msg: "Bunday foydalanuvchi topilmadi",
      variant: "error",
      payload: null,
    });
  }
  users.splice(existUser, 1);

  res.status(200).json({
    msg: "Foydalanuvchi olib tashlandi",
    variant: "success",
    payload: index,
  });
});

router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { fname, username, password } = req.body;
  if (!fname || !username || !password) {
    return res.status(400).json({
      msg: "Ma'lumotlarni to'liq to'ldiring",
      variant: "error",
      payload: null,
    });
  }
  let index = users.findIndex((user) => user.id === parseInt(id));
  if (index < 0) {
    return res.status(400).json({
      msg: " Bunday foydalanuvchi topilmadi",
      variant: "error",
      payload: null,
    });
  }
  let updateUser = {
    id: +id,
    fname,
    username,
    password,
  };

  users.splice(index, 1, updateUser);
  res.status(200).json({
    msg: "Foydalanuvchi ma'lumotlari o'zgartirildi",
    variant: "success",
    payload: updateUser,
  });
});

module.exports = router;
