import WorkType from '../models/WorkType';


export const getAllWorkTypes = async (req, res, next) => {
  try {
    const workTypes = await WorkType.find({}, 'name');
    res.status(200).json({
      code: 200,
      message: 'Success',
      payload: workTypes
    });
  } catch (err) {
    next(err);
  }
};

export const createWorkType = async (req, res, next) => {
  const { name } = req.body;

  try {
    const workType = new WorkType({ name });
    await workType.save();
    res.status(200).json({
      code: 200,
      message: 'Success'
    });
  } catch (err) {
    next(err);
  }
};

export const updateWorkType = async (req, res, next) => {
  const workTypeId = req.params.id;
  const { name } = req.body;

  try {
    const workType = await WorkType.findById(workTypeId);
    if (!workType) {
      return res.status(404).json({ code: 404, message: 'Work type not found' });
    }

    workType.name = name;

    await workType.save();

    res.status(200).json({
      code: 200,
      message: 'Updated Successfully'
    });
  } catch (err) {
    next(err);
  }
};

export const deleteWorkType = async (req, res, next) => {
  const workTypeId = req.params.id;

  try {
    const workType = await WorkType.findByIdAndDelete(workTypeId);
    if (!workType) {
      return res.status(404).json({ code: 404, message: 'Not found' });
    }

    res.status(200).json({ code: 200, message: 'Work type deleted successfully' });
  } catch (err) {
    next(err);
  }
};
