const { products } = require("../server");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!products.length) {
    res.status(400).json({
      msg: "Ma'lumot topilmadi",
      variant: "error",
      payload: null,
    });
  }
  res.status(200).json({
    msg: "Barcha mahsulotlar",
    variant: "success",
    payload: products,
    total: products.length,
  });
});

router.post("/", (req, res) => {
  const { title, price, url, category } = req.body;
  if (!title || !price || !url || !category) {
    return res.status(400).json({
      msg: "Ma'lumotlarni to'liq to'ldiring",
      variant: "error",
      payload: null,
    });
  }

  let existProduct = products.find((product) => product.title === title);

  if (existProduct) {
    return res.status(400).json({
      msg: "Bu mahsulot mavjud",
      variant: "error",
      payload: null,
    });
  }

  let newProduct = {
    id: new Date().getTime(),
    ...req.body,
  };

  products.push(newProduct);

  res.status(200).json({
    msg: "Mahsulot qo'shildi",
    variant: "success",
    payload: newProduct,
  });
});
router.put("/:id", (req, res) => {
  let { id } = req.params;
  const { title, price, url, category } = req.body;
  if (!title || !price || !url || !category) {
    return res.status(400).json({
      msg: "Malumotlarni to'liq  to'ldiring",
      variant: "error",
      payload: null,
    });
  }

  let index = products.findIndex((product) => product.id === parseInt(id));
  if (index < 0) {
    return res.status(400).json({
      msg: "Mahsulot topilmadi",
      variant: "error",
      payload: null,
    });
  }
  let updateProduct = {
    id: +id,
    ...req.body,
  };

  products.splice(index, 1, updateProduct);
  res.status(200).json({
    msg: "Mahsulot  o'zgartirildi",
    variant: "success",
    payload: updateProduct,
  });
});
router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let existProduct = products.findIndex(
    (product) => product.id === parseInt(id)
  );
  let index = products.find((product) => product.id === parseInt(id));
  if (existProduct < 0) {
    return res.status(400).json({
      msg: "Mahsulot topilmadi",
      variant: "error",
      payload: null,
    });
  }

  products.splice(existProduct, 1);

  res.status(200).json({
    msg: "Mahsulot olib tashlandi",
    variant: "success",
    payload: index,
  });
});

module.exports = router;
