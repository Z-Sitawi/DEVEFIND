import Recruiter from '../modules/recruiter.js';
import Tools from '../utils/myfunctions.js';
import Authentification from '../controller/authController.js';
import mongoose from 'mongoose';
import redisClient from '../utils/redis.js';

const ADMINS = ["ZAKARIA", "OSBERT", "SANDRA"]; //! TO BE REMOVED LATER

class RecruiterController {
  static async create (req, res) {
    try {
      const { firstname, lastname, email, password, confirmPwd } = req.body;

      /* ======= checks ========== */
      if (!firstname || !lastname || !email || !password || !confirmPwd) return res.status(400).json({ error: 'All Fields Must Be Filed' });
      if (password !== confirmPwd) return res.status(400).json({ error: 'Passwords Do Not Match' });

      const user = await Recruiter.findOne({ email });
      if (user) return res.status(400).json({ error: 'email already exist' });
      /* ======= End of checks ========== */

      const hashedPwd = await Tools.hashPwd(password);
      const newRecruiterData = { firstname, lastname, email, password: hashedPwd };

      const recruiter = await Recruiter.create(newRecruiterData);
      console.log('Recruiter Account Created Successfully with the Id => ' + recruiter._id.toString());
      res.status(201).json({message: "Recruiter Account Created Successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async get (req, res) {
      //! TO BE REMOVED LATER
      if (req.header('admin') && ADMINS.includes(req.header('admin').toUpperCase())) {
        const all = await Recruiter.find(); 
        return res.status(200).json({Recruiters: all});
      }
      //! ================= END ================= !\\

      try {
        const authToken = req.header('X-Token');
        const userId = await Authentification.valideLogin(authToken);
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  
        if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ error: 'Invalid ID format' });
  
        const user = await Recruiter.findById(userId);
  
        if (!user) return res.status(404).send({error: "Recruiter Not Found"});
        return res.status(200).json({ recruiter: user });
  
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }

  static async del (req, res) {
    try {
      const authToken = req.header('X-Token');
      const userId = await Authentification.valideLogin(authToken);
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ error: 'Invalid ID format' });

      const result = await Recruiter.findByIdAndDelete(userId);

      if (!result) return res.status(404).send({error: "Recruiter Not Found"});

      redisClient.client.del(`recruiter_Auth-${authToken}`);
      return res.status(200).json({ "message": "Recruiter successfully deleted." });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update (req, res) {
    try {
      const authToken = req.header('X-Token');
      const userId = await Authentification.valideLogin(authToken);

      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ error: 'Invalid ID format' });

      const { firstname, lastname, password, confirmPwd } = req.body;
      const filter = { _id: new mongoose.Types.ObjectId(userId) };
      let newRecruiterData = {};

      if (password) {
        if (!confirmPwd) return res.status(400).json({ error: 'Confirmation Password is Required' });
        if (password !== confirmPwd) return res.status(400).json({ error: 'Passwords Do Not Match' });

        const hashedPwd = await Tools.hashPwd(password);
        newRecruiterData = { password: hashedPwd };
      } 
      if (firstname) newRecruiterData = { ...newRecruiterData, firstname };
      if (lastname) newRecruiterData = { ...newRecruiterData, lastname };

      const result = await Recruiter.findOneAndUpdate(filter, newRecruiterData);

      if (!result) return res.status(404).json({ error: 'Recruiter Not Found' });
      else res.status(200).json({ "message": "Recruiter successfully updated." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default RecruiterController;
