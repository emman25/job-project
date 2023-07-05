import User from '../models/User';
import bcrypt from 'bcryptjs';
import path from 'path';


export const hashPassword = async (password, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return { salt, hashedPassword };
};


export const getUserById = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({code: 200, message: 'Success', payload: user});
  } catch (err) {
    next(err);
  }
};


export const updateUser = async (req, res, next) => {
  const userId = req.user.id;

  const { name, email, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {

      const { hashedPassword } = await hashPassword(password, 10);


      user.password = hashedPassword
    };

    await user.save();
    res.status(200).json({
      code: 200,
      message: 'Successfully updated user'
    })
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};


export const getSavedJobs = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate('savedJobs').sort({ createdAt: 1 });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const savedJobs = user.savedJobs;


    res.status(200).json({
      code: 200,
      message: 'Success',
      payload: savedJobs
    });
  } catch (err) {
    next(err);
  }
};

export const saveJob = async (req, res, next) => {
  const userId = req.user.id;

  const jobId = req.params.jobId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    if (user.savedJobs.includes(jobId)) {
      return res.status(400).json({ message: 'Job already saved' });
    }

    user.savedJobs.push(jobId);
    await user.save();

    res.status(200).json({ code: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};

export const unsaveJob = async (req, res, next) => {
  const userId = req.user.id;

  const jobId = req.params.jobId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.savedJobs = user.savedJobs.filter((savedJobId) => savedJobId._id.toString() !== jobId);
    await user.save();

    res.status(200).json({ code: 200, message: 'Success' });
  } catch (err) {
    next(err);
  }
};


export const uploadCV = async (req, res, next) => {

  try {
    const userId = req.user.id;
    const { originalname } = req.file;

    if (!originalname) {
      return res.status(500).json({ code: 500, message: 'CV file is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(500).json({ code: 500, error: 'User not found' });
    }

    user.cv = originalname;
    await user.save();

    res.status(200).json({ code: 200, message: 'CV uploaded successfully' });
  } catch (error) {
    next(error)
  }
};


export const getCV = async (req, res, next) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(500).json({ code: 500, error: 'User not found' });
    }

    const uploadDirectory = 'uploads';
    let filename = user.cv;

    const filePath = path.join(uploadDirectory, filename);
    res.download(filePath, (err) => {
      if (err) {
        // Handle the error, such as sending an appropriate response
        res.status(404).send('File not found');
      }
    });

  } catch (error) {
    next(error)
  }
};

