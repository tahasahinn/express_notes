const NotModel = require("../models/notModel.js");
const mongoose = require("mongoose");

const notlarGetir = async (req, res) => {
  const notlar = await NotModel.find().sort({ createdAt: -1 });
  try {
    res.status(200).json(notlar);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const notOlustur = async (req, res) => {
  const { baslik, aciklama } = req.body;

  try {
    const not = await NotModel.create({ baslik, aciklama });
    res.status(200).json({ msg: "Not başarıyla eklendi", data: not });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const notGetir = async (req, res) => {
  const { id } = req.params;
  const not = await NotModel.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "ID geçersiz" });
  }

  if (!not) {
    return res.status(404).json({ msg: "Not bulunamadı" });
  }
  res.status(200).json(not);
};

const notSil = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "ID geçersiz" });
  }
  const not = await NotModel.findOneAndDelete({ _id: id });

  if (!not) {
    return res.status(404).json({ msg: "Not bulunamadı" });
  }
  res.status(200).json({ mesg: "NOT başarıyla silindi", data: not });
};

const notGuncelle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "ID geçersiz" });
  }
  const not = await NotModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!not) {
    return res.status(404).json({ msg: "Not bulunamadı" });
  }
  res.status(200).json({ msg: "NOT başarıyla güncellendi", data: not });
};
module.exports = { notOlustur, notlarGetir, notGetir, notSil, notGuncelle };
