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
          return res.status(200).json({ Developer: user });
    
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

    static async update (req, res) {
        try {
          const authToken = req.header('X-Token');
          const userId = await Authentification.valideLogin(authToken, "dev");
    
          if (!userId) return res.status(401).json({ error: 'Unauthorized' });
          if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ error: 'Invalid ID format' });
    
          const { firstname, lastname, age, gender, country, backupEmail, phone, profession, languages, password, confirmPwd, headline, description } = req.body;
          const filter = { _id: new mongoose.Types.ObjectId(userId) };
          let newDevData = {};
          
          const user = await Developer.findById(userId);
          if (!user) return res.status(404).json({ error: 'Developer Not Found' });
          
          let updatedSummary = user.summary || {};
          updatedSummary.headline = headline;
          updatedSummary.description = description;
          newDevData.summary = updatedSummary;

          if (password) {
            if (!confirmPwd) return res.status(400).json({ error: 'Confirmation Password is Required' });
            if (password !== confirmPwd) return res.status(400).json({ error: 'Passwords Do Not Match' });
    
            const hashedPwd = await Tools.hashPwd(password);
            newDevData.password= hashedPwd;
          }
          if (age < 18 || age > 65) return res.status(400).json({ error: 'Invalid age it must be between 18 and 65' });
          newDevData.age =  age;
          if (!firstname || !lastname || !age || !gender || !country || !profession || !languages)
            return res.status(400).json({ error: 'Mandatory fields must be filed' });

          if (languages) {
            const langArr = languages.split(',');
            const newArr = langArr.map(lan => {
                const oneLang = lan.split(':');
                return {language: oneLang[0].trim(), proficiency: oneLang[1].trim()};
            });
            newDevData.languages = newArr;
        }

          newDevData.firstname = firstname;
          newDevData.lastname = lastname;
          newDevData.gender = gender;
          newDevData.country = country;
          newDevData.profession = profession;
          newDevData.backupEmail = backupEmail;
          newDevData.phone = phone;
    
          const result = await Developer.findOneAndUpdate(filter, newDevData, { new: true });
    
          if (!result) return res.status(404).json({ error: 'Developer Not Found' });
          else res.status(200).json({ "message": "Developer successfully updated." });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }
}

export default DeveloperController;
