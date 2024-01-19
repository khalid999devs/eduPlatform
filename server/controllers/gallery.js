const { Gallery } = require('../models');
const { BadRequestError } = require('../errors');
const deleteFile = require('../utils/deleteFile');

const findTotal = async () => {
  return await Gallery.count();
};

const addGalleryImage = async (req, res) => {
  const { rows, cols, order } = req.body;
  const data = {
    rows: rows ? rows : 1,
    cols: cols ? cols : 1,
    order: order ? order : Number(await findTotal()) + 1,
    BigImage: req.files.gallery[0].path,
    thumbnail: req.files.thumbnail[0].path,
  };
  const createdResult = await Gallery.create(data);

  res.status(201).json({ succeed: true, result: createdResult });
};

const updateGalleryImg = async (req, res) => {
  const id = req.params.id;
  if (!id) throw BadRequestError('you did not provide the id');
  const { rows, cols, order } = req.body;
  const dataToUpdate = {
    rows: rows ? rows : 1,
    cols: cols ? cols : 1,
    order: order ? order : Number(await findTotal()) + 1,
  };
  const metaData = await Gallery.update(dataToUpdate, { where: { id: id } });
  if (metaData[0] < 1) {
    return res.json({ succeed: false, msg: 'wrong id entered' });
  }
  res.json({ succeed: true, msg: 'successfully updated' });
};

const deleteImg = async (req, res) => {
  const id = req.params.id;
  const targetImage = await Gallery.findByPk(id);

  if (targetImage) {
    const BigImageFile = targetImage.dataValues.BigImage;
    const Thumbnail = targetImage.dataValues.thumbnail;
    deleteFile(BigImageFile);
    deleteFile(Thumbnail);
  }
  await Gallery.destroy({ where: { id: id } });
  res.json({ succeed: true, msg: 'delete succeed' });
};

const getGalleryImages = async (req, res) => {
  const images = await Gallery.findAll({ order: [['order', 'ASC']] });
  res.json({ succeed: true, result: images });
};

module.exports = {
  addGalleryImage,
  updateGalleryImg,
  getGalleryImages,
  deleteImg,
};
