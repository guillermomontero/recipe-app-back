import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import _ from 'underscore';
import MailService from '../config/mailer';
import { optionsWelcome } from '../config/mailer/options/welcome';
import { optionsUserCancel } from '../config/mailer/options/user-cancel';
import { optionsUserDelete } from '../config/mailer/options/user-delete';
import { generateToken } from '../utils/generate-token';
import User from '../models/user.model';

const saltRounds = 10;

export class UserController {
  static getAllUsers = async (req: Request, res: Response) => {
    try {
      const usersDB = await User.find({}, { password: 0 });
      
      res.send(usersDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static createUser = async (req: Request, res: Response) => {
    const payload = req.body;
    payload.password = bcrypt.hashSync(req.body.password, saltRounds);
  
    try {
      const userDB = new User(payload);
      await userDB.save();

      const dataToToken = {
        _id: userDB._id,
        name: userDB.name
      };
  
      const token = generateToken(dataToToken);
  
      const options = optionsWelcome(userDB, token);
      await MailService.sendMail(options);
  
      res.json(userDB)
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static getUser = async (req: Request, res: Response) => {
    const _id = req.params.id;
  
    try {
      const userDB = await User.find({ _id }, { password: 0 });
  
      res.json(userDB[0]);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static getUserData = async (req: Request, res: Response) => {
    const _id = req.params.id;
  
    try {
      const userDB = await User.find({ _id }, { name: 1, premium: 1, nickname: 1 });
  
      res.json(userDB[0]);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static deleteUser = async (req: Request, res: Response) => {
    const _id = req.body._id;
    // Through Underscore we choose which fields can be modified
    const body = _.pick(req.body, [
      'active',
    ]);
  
    try {
      await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });
      const userDB = await User.find({ _id }, { password: 0 });

      const options = optionsUserCancel(userDB[0]);
      await MailService.sendMail(options);
  
      res.json(userDB[0]);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static deleteUserAdmin = async (req: Request, res: Response) => {
    const _id = req.params.id;
  
    try {
      const userDB = await User.find({ _id }, { password: 0 });
      await User.findByIdAndDelete({ _id });

      const options = optionsUserDelete(userDB[0]);
      await MailService.sendMail(options);
  
      res.json({ msg: 'User successfully deleted' });
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static editUser = async (req: Request, res: Response) => {
    const _id = req.body._id;
    // Through Underscore we choose which fields can be modified
    const body = _.pick(req.body, [
      'name',
      'lastname',
      'birthday',
      'telephone',
      'location',
      'imageProfile',
      'password',
      'allowEmail',
      'notifications'
    ]);
  
    try {
      await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });
      const userDB = await User.findOne({ _id }, { password: 0, allowEmail: 0, allowTerms: 0, notifications: 0, active: 0, leavingDate: 0, role: 0, favorites: 0 });
  
      const dataToToken = {
        _id: userDB?._id,
        name: userDB?.name
      }
  
      const token = generateToken(dataToToken);
  
      res.json({
        userDB,
        token
      });
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static editUserAdmin = async (req: Request, res: Response) => {
    const _id = req.body._id;
    // Through Underscore we choose which fields can be modified
    const body = _.pick(req.body, [
      'name',
      'lastname',
      'nickname',
      'emailname',
      'telephone',
      'birthday',
      'location',
      'imageProfile',
      'premium',
      'premiumSince',
      'premiumUntil',
      'role',
      'allowEmail',
      'allowTerms',
      'notifications',
    ]);
  
    try {
      await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });
  
      res.json({ msg: 'User edited successfully'});
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static changeEmail = async (req: Request, res: Response) => {
    const _id = req.body._id;
    // Through Underscore we choose which fields can be modified
    const body = _.pick(req.body, [
      'email',
    ]);
  
    try {
      await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });
      const userDB = await User.findOne({ _id }, { password: 0, allowEmail: 0, allowTerms: 0, notifications: 0, active: 0, leavingDate: 0 });
  
      const dataToToken = {
        _id: userDB?._id,
        name: userDB?.name
      }
  
      const token = generateToken(dataToToken);
  
      res.json({
        userDB,
        token
      });
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static changePassword = async (req: Request, res: Response) => {
    const _id = req.body._id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const userDB = await User.findById({ _id }, { password: 1 });
    // Through Underscore we choose which fields can be modified
    const body = {
      _id,
      password: bcrypt.hashSync(newPassword, saltRounds),
    };
  
    // Si el usuario existe, evaluamos la contraseña
    if (!userDB || !bcrypt.compareSync(oldPassword, userDB.password)) {
      return res.status(400).json({
        message: 'Invalid password'
      });
    }
  
    try {
      await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });
      const userDB = await User.findOne({ _id }, { password: 0, allowEmail: 0, allowTerms: 0, notifications: 0, active: 0, leavingDate: 0 });
  
      const dataToToken = {
        _id: userDB?._id,
        name: userDB?.name
      }
  
      const token = generateToken(dataToToken);
  
      res.json({
        userDB,
        token
      });
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static changePreferences = async (req: Request, res: Response) => {
    const _id = req.body._id;
    // Through Underscore we choose which fields can be modified
    const body = _.pick(req.body, [
      'allowEmail',
      'notifications',
    ]);
  
    try {
      await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });
      const userDB = await User.findOne({ _id }, { password: 0, allowEmail: 0, allowTerms: 0, notifications: 0, active: 0, leavingDate: 0 });
  
      const dataToToken = {
        _id: userDB?._id,
        name: userDB?.name
      }
  
      const token = generateToken(dataToToken);
  
      res.json({
        userDB,
        token
      });
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static changePlan = async (req: Request, res: Response) => {
    const _id = req.body._id;
    // Through Underscore we choose which fields can be modified
    const body = _.pick(req.body, [
      'premium',
    ]);
  
    try {
      await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });
      const userDB = await User.findOne({ _id }, { password: 0, allowEmail: 0, allowTerms: 0, notifications: 0, active: 0, leavingDate: 0, role: 0, favorites: 0 });
  
      const dataToToken = {
        _id: userDB?._id,
        name: userDB?.name
      }
  
      const token = generateToken(dataToToken);
  
      res.json({
        userDB,
        token
      });
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static deleteImageProfile = async (req: Request, res: Response) => {
    const _id = req.body._id;
    // Through Underscore we choose which fields can be modified
    const body = _.pick(req.body, [
      'imageProfile',
    ]);
  
    try {
      await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });
      const userDB = await User.findOne({ _id }, { password: 0, allowEmail: 0, allowTerms: 0, notifications: 0, active: 0, leavingDate: 0, role: 0, favorites: 0 });
  
      const dataToToken = {
        _id: userDB?._id,
        name: userDB?.name
      }
  
      const token = generateToken(dataToToken);
  
      res.json({
        userDB,
        token
      });
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static getMyFavorites = async (req: Request, res: Response) => {
    const _id = req.params.id;
    const skip = Number(req.query.skip) || 0;
    const limit = Number(req.query.limit) || 0;
  
    try {
      const totalRecipesDB = await User.find({ author: _id }, { favorites: 1 }).length;
      const recipesDB = await User.find({ author: _id }).populate({ path: 'favorites' }).sort({ createDate: -1 }).skip(skip).limit(limit);
      
      const recipes = {
        totalRecipes: totalRecipesDB,
        recipes: recipesDB
      };
  
      res.json(recipes);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static getUsersForPanel = async (req: Request, res: Response) => {
    const dateUntil = new Date().toISOString().split('T')[0];
    const fromServerUntil = new Date(dateUntil).toISOString().split('T')[0];
  
    const getDateFrom = new Date().getTime() - ((24*60*60*1000) * 7);
    const dateFrom = new Date(getDateFrom).toISOString().split('T')[0];
    const fromServerFrom = new Date(dateFrom).toISOString().split('T')[0];
  
    const from = req.query.from || fromServerFrom;
    const until = req.query.until || fromServerUntil;
  
    try {
      const totalUsersDB = await User.find().countDocuments();
      const agg = [
        {
          '$match': {
            'createDate': { $gte: new Date(String(from)), $lte: new Date(String(until)) }
          },
        },
      ];
      const usersDB = await User.aggregate(agg).group({ _id: '$createDate', total: { $sum: 1 } }).sort({ _id: 1 });
      
      const users = {
        id: String(new Date().getTime()),
        title: 'usuarios',
        page: 'admin-users',
        total: totalUsersDB,
        showChart: true,
        order: 1,
        labelTooltip: 'usuariosDadosDeAlta',
        range: [from, until],
        totalLastWeek: usersDB.reduce((a, b) => a + b.total, 0),
        data: usersDB
      };
  
      res.json(users);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    };
  };
  
  static unsuscribeUserAdmin = async (req: Request, res: Response) => {
    const _id = req.body._id;
    // Through Underscore we choose which fields can be modified
    const body = _.pick(req.body, [
      'active',
    ]);
  
    try {
      const userDB = await User.find({ _id }, { password: 0 });
      await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });

      const options = optionsUserCancel(userDB[0]);
      await MailService.sendMail(options);
  
      res.json({ msg: 'user successfully unsubscribed' });
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
};

export default UserController;
