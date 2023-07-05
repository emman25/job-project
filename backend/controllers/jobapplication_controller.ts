import JobApplication from '../models/JobApplication';
import Job from '../models/Job';
import User from '../models/User';
import jwt from 'jsonwebtoken'


export const createJobApplication = async (req, res, next) => {
    try {
        const { jobId, email } = req.body;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ error: 'Job not found.' });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ name: email, email, location: '', isEmailVerified: false });
            await user.save();
        }

        const jobApplication = new JobApplication({
            jobId,
            userId: user._id
        });

        await jobApplication.save();

        const payload = { user: { id: user._id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET!!);

        res.status(200).json({
            code: 200,
            message: 'Success',
            payload: token
        });
    } catch (error) {
        next(error)
    }
};
