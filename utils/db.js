import mongoose from 'mongoose';
import Recruiter from '../modules/recruiter.js';
import dotenv from 'dotenv';

dotenv.config();
const user = process.env.USER;
const pwd = process.env.PASSWORD;
const ADMINS = ["ZAKARIA", "OSBERT", "SANDRA"];

class Database {
  static async connect () {
    await mongoose.connect(`mongodb+srv://${user}:${pwd}@cluster0.h7wda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('Database Connected Successfully');
  }

  static async stats (req, res) {
    try {
      if (!req.header('admin') || !ADMINS.includes(req.header('admin').toUpperCase())) {
        return res.status(401).json({error: "Unauthorized"});
      }
      const count = await Recruiter.countDocuments({});
      res.status(200).json({ Recruiters: count, Developers: 0 });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default Database;
