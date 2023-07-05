import Location from '../models/Location';

export const getAllLocations = async (req, res, next) => {
  try {
    const locations = await Location.find({}, 'name');;
    res.status(200).json({
      code: 200,
      message: 'Success',
      payload: locations
    });
  } catch (error) {
    next(error);
  }
};


export const createLocation = async (req, res, next) => {
  const { name } = req.body;
  try {
    const location = await Location.create({ name });
    res.status(200).json({
      code: 200,
      message: 'Successfully created location'
    });
  } catch (error) {
    next(error);
  }
};


export const updateLocation = async (req, res, next) => {
  const locationId = req.params.id;
  const { name } = req.body;

  try {
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(404).json({ code: 404, message: 'Not found' });
    }

    location.name = name;

    await location.save();

    res.status(200).json({
      code: 200,
      message: 'Updated Successfully'
    });
  } catch (err) {
    next(err);
  }
};

export const deleteLocation = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Location.findByIdAndDelete(id);
    res.status(200).json({ code: 200, message: 'Location deleted successfully' });
  } catch (error) {
    next(error);
  }
};
