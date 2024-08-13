import Developer from '../modules/developer.js';
import Tools from '../utils/myfunctions.js';
import Authentification from '../controller/authController.js';
import mongoose from 'mongoose';
import redisClient from '../utils/redis.js';

class DeveloperController {
    static async create (req, res) {
        try {
          const { firstname, lastname, email, password, confirmPwd, age, gender, country, profession } = req.body;
    
          /* ======= checks ========== */
          if (!firstname || !lastname || !email || !password || !confirmPwd || !age || !gender || !country || !profession) 
            return res.status(400).json({ error: 'All Fields Must Be Filed' });
          if (password !== confirmPwd) return res.status(400).json({ error: 'Passwords Do Not Match' });
    
          const user = await Developer.findOne({ email });
          if (user) return res.status(400).json({ error: 'email already exist' });
          /* ======= End of checks ========== */
    
          const hashedPwd = await Tools.hashPwd(password);
          const newDevData = { firstname, lastname, email, password: hashedPwd, age, gender, country, profession };
    
          const developer = await Developer.create(newDevData);
          console.log('Developer Account Created Successfully with the Id => ' + developer._id.toString());
          res.status(201).json({message: "Developer Account Created Successfully"});
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    static async del (req, res) {
        try {
          const authToken = req.header('X-Token');
          const userId = await Authentification.valideLogin(authToken, "dev");
          if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    
          if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ error: 'Invalid ID format' });
    
          const result = await Developer.findByIdAndDelete(userId);
    
          if (!result) return res.status(404).send({error: "Developer Not Found"});
    
          redisClient.client.del(`dev_Auth-${authToken}`);
          return res.status(200).json({ "message": "Developer successfully deleted." });
    
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    static async get (req, res) {
        try {
          const authToken = req.header('X-Token');
          const userId = await Authentification.valideLogin(authToken, "dev");
          if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    
          if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ error: 'Invalid ID format' });
    
          const user = await Developer.findById(userId);
    
          if (!user) return res.status(404).send({error: "Developer Not Found"});
          return res.status(200).json({ user });
    
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    static async getAll (req, res) {
        try {
          const authToken = req.header('X-Token');
          const userId = await Authentification.valideLogin(authToken);
          if (!userId) return res.status(401).json({ error: 'Unauthorized' });
        
          const user = await Developer.find({});
          return res.status(200).json({ Developers: user });
    
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }
}

export default DeveloperController;
