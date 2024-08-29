import mongoose from 'mongoose';
import Recruiter from '../modules/recruiter.js';
import Developer from '../modules/developer.js';
import functions from 'firebase-functions';

const mongoURI = functions.config().mongodb.uri;

class Database {
  static async connect () {
    await mongoose.connect(mongoURI);
    console.log('Database Connected Successfully');
  }

  static async stats (req, res) {
    try {
      const countRecruiters = await Recruiter.countDocuments({});
      const countDevelopers = await Developer.countDocuments({});
      res.status(200).json({ Recruiters: countRecruiters, Developers: countDevelopers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default Database;
