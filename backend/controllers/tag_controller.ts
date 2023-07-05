import Tag from '../models/Tag';


export const getAlltag = async (req, res, next) => {
  try {
    const tag = await Tag.find({}, 'name');
    res.status(200).json({
      code: 200,
      message: 'Success',
      payload: tag
    });
  } catch (err) {
    next(err);
  }
};

export const createTag = async (req, res, next) => {
  const { name } = req.body;

  try {
    const tag = new Tag({ name });
    await tag.save();
    res.status(200).json({
      code: 200,
      message: 'Success'
    });
  } catch (err) {
    next(err);
  }
};

export const updateTag = async (req, res, next) => {
  const TagId = req.params.id;
  const { name } = req.body;

  try {
    const tag = await Tag.findById(TagId);
    if (!tag) {
      return res.status(404).json({ code: 404, message: 'Work type not found' });
    }

    tag.name = name;

    await tag.save();

    res.status(200).json({
      code: 200,
      message: 'Updated Successfully'
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTag = async (req, res, next) => {
  const TagId = req.params.id;

  try {
    const tag = await Tag.findByIdAndDelete(TagId);
    if (!tag) {
      return res.status(404).json({ code: 404, message: 'Not found' });
    }

    res.status(200).json({ code: 200, message: 'tag deleted successfully' });
  } catch (err) {
    next(err);
  }
};
