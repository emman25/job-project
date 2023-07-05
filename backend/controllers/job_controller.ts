import Job from '../models/Job';
import WorkType from '../models/WorkType';
import Location from '../models/Location';
import Tag from '../models/Tag';
import { ObjectId } from 'mongoose';


export const getJobsById = async (req, res, next) => {

  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate('workType location tags').sort({ createdAt: 1 });
    if (!job) {
      return res.status(404).json({ code: 404, message: 'Not found' });
    }

    res.status(200).json({
      code: 200,
      message: 'Success',
      payload: job
    });

  } catch (err) {
    next(err);
  }
};

export const getAllJobs = async (req, res, next) => {

  try {
    const jobId = req.query.id;
    if (jobId == undefined) {

      const {workType, tag, location} = req.query

      const filter = {};
      if (workType && workType.trim().length > 0) {
        const workTypeObjectId = await WorkType.find({name: workType})
        filter.workType = workTypeObjectId
      }
      if (location && location.trim().length > 0) {
        const locationObjectId = await Location.find({name: location})
        console.log(locationObjectId)
        filter.location = locationObjectId
      }
      if (tag && tag.trim.length > 0) {
        const tagObjectId = await Tag.find({name: ''})
        filter.tags = tagObjectId
      }

      console.log(filter)

      const jobs = await Job.find(filter).populate('workType location tags').sort({ createdAt: 1 });

      res.status(200).json({
        code: 200,
        message: 'Success',
        payload: jobs
      });

    } else {
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ code: 404, message: 'Not found' });
      }

      res.status(200).json({
        code: 200,
        message: 'Success',
        payload: job
      });
    }
  } catch (err) {
    next(err);
  }
};

export const createJob = async (req, res, next) => {
  const { position, workType, tags, location, minSalary, maxSalary, description } = req.body;

  try {
    let checkWorkType = await WorkType.findOne({ name: workType });
    if (!checkWorkType) {
      checkWorkType = new WorkType({ name: workType });
      await checkWorkType.save();
    }

    let checkLocation = await Location.findOne({ name: location });
    if (!checkLocation) {
      checkLocation = new Location({ name: location });
      await checkLocation.save();
    }

    let tagIds = []
    for (let i = 0; i < tags.length; i++) {
      let checkTag = await Tag.findOne({ name: tags[i] });
      if (!checkTag) {
        checkTag = new Tag({ name: tags[i] });
        await checkTag.save();
      }

      tagIds.push(checkTag._id)
    }

    const job = new Job({
      position,
      workType: checkWorkType._id,
      tags: tagIds,
      location: checkLocation._id,
      minSalary,
      maxSalary,
      description,
    });

    await job.save()
    res.status(200).json({
      code: 200, message: 'Success'
    });
  } catch (err) {
    next(err);
  }
};

export const updateJob = async (req, res, next) => {
  const jobId = req.params.id;
  const { position, workType, tags, location, minSalary, maxSalary, description } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (position) job.position = position;
    if (workType) {
      let checkWorkType = await WorkType.findOne({ name: workType });
      if (!checkWorkType) {
        checkWorkType = new WorkType({ name: workType });
        await checkWorkType.save();
      }
      job.workType = checkWorkType._id
    };
    if (tags) job.tags = tags;
    if (location) {
      let checkLocation = await Location.findOne({ name: location });
      if (!checkLocation) {
        checkLocation = new Location({ name: location });
        await checkLocation.save();
      }
      job.location = checkLocation._id
    };
    if (minSalary) job.minSalary = minSalary;
    if (maxSalary) job.maxSalary = maxSalary;
    if (description) job.description = description;

    await job.save();

    res.status(200).json({
      code: 200,
      message: 'Job updated successfully'
    });
  } catch (err) {
    next(err);
  }
};

export const deleteJob = async (req, res, next) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
      return res.status(404).json({ code: 404, message: 'Job not found' });
    }

    res.status(200).json({ code: 200, message: 'Job deleted successfully' });
  } catch (err) {
    next(err);
  }
};
