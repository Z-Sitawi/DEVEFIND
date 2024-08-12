import Recruiter from '../modules/recruiter.js';
import redisClient from '../utils/redis.js';
import Tools from '../utils/myfunctions.js';
import mongoose from 'mongoose';


class Authentification {
  static async loginRecruiter (req, res) {
    try {
      const { email, password } = req.body;
      /* ======= checks ========== */
      if (!email || !password) return res.status(400).json({ error: 'All Fields Must Be Filed' });

      const user = await Recruiter.findOne({ email });
      if (!user) return res.status(401).json({ error: 'Account Does Not Exist' });

      const result = await Tools.authenticatePassword(password, user.password);
      if (!result) return res.status(401).json({ error: 'Incorrect Password' });
      /* ======= End Of checks ========== */

      const token = Tools.generateToken();
      const key = `recruiter_Auth-${token}`;
      const value = user.id;
      const timeInSec = 60 * 60 * 12; //! Authentification expires after 12 Hours

      const reply = await redisClient.client.set(key, value, timeInSec);
      if (reply !== 'OK') return res.status(500).json({ error: 'Rrdis Server Error' });
      console.log(`Log in Success, Token: ${token}`);
      res.status(200).json({ status: 'connected', token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async valideLogin (authToken, userType="rec") {
    const key = (userType === "dev")? "dev_Auth": "recruiter_Auth";
    if (!authToken) return false;
    const userId = redisClient.client.get(`${key}-${authToken}`);
    if (!userId) return false;

    return userId;
  }

  static async logoutRecruiter(req, res) {
    try {
        const authToken = req.header('X-Token');
        const userId = await Authentification.valideLogin(authToken);

        if (!userId) return res.status(401).json({ error: 'Unauthorized' });
        if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ error: 'Invalid ID format' });

        redisClient.client.del(`recruiter_Auth-${authToken}`);
        return res.status(200).json({ "message": "User Successfully Loged Out." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
  }
}

export default Authentification;
