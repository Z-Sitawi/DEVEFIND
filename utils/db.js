import mongoose from 'mongoose';
import Recruiter from '../modules/recruiter.js';
import dotenv from 'dotenv';

dotenv.config();
/* const user = process.env.USER;
const pwd = process.env.PASSWORD; */

class Database {
  static async connect () {
    await mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE}`);
    console.log('Database Connected Successfully');
  }

  static async stats (req, res) {
    try {

      const count = await Recruiter.countDocuments({});
      res.status(200).json({ Recruiters: count, Developers: 0 });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default Database;
