import { Request, Response } from 'express';
import _ from 'underscore';
import Category from '../models/category.model';

export class CategoryController {
  static getAllCategories = async (req: Request, res: Response) => {
    try {
      const categoriesDB = await Category.find();
      
      res.send(categoriesDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static createCategory = async (req: Request, res: Response) => {
    const payload = req.body;
  
    try {
      const categoryDB = new Category(payload);
      await categoryDB.save();
      
      res.json(categoryDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static getCategory = async (req: Request, res: Response) => {
    const _id = req.params.id;
  
    try {
      const categoryDB = await Category.find({ _id });
      res.json(categoryDB[0]);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
  
  static deleteCategoryAdmin = async (req: Request, res: Response) => {
    const _id = req.params.id;
  
    try {
      await Category.findByIdAndDelete({ _id });
  
      res.json({ msg: 'Category remove successfully'});
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static editCategoryAdmin = async (req: Request, res: Response) => {
    const _id = req.body._id;
    // Through Underscore we choose which fields can be modified
    const body = _.pick(req.body, [
      'name',
    ]);
  
    try {
      const categoryDB = await Category.findByIdAndUpdate(_id, body, { new: true, runValidators: true, context: 'query' });
  
      res.json(categoryDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      })
    }
  };
  
  static getCategoriesForPanel = async (req: Request, res: Response) => {
    const dateUntil = new Date().toISOString().split('T')[0];
    const fromServerUntil = new Date(dateUntil).toISOString().split('T')[0];
  
    const getDateFrom = new Date().getTime() - ((24*60*60*1000) * 7);
    const dateFrom = new Date(getDateFrom).toISOString().split('T')[0];
    const fromServerFrom = new Date(dateFrom).toISOString().split('T')[0];
  
    const from = req.query.from || fromServerFrom;
    const until = req.query.until || fromServerUntil;
  
    try {
      const totalCategoriesDB = await Category.find().countDocuments();
      const agg = [
        {
          '$match': {
            'createDate': { $gte: new Date(String(from)), $lte: new Date(String(until)) }
          },
        },
      ];
      const categoriesDB = await Category.aggregate(agg).group({ _id: '$createDate', total: { $sum: 1 } }).sort({ _id: 1 });
      
      const users = {
        id: String(new Date().getTime()),
        title: 'categorias',
        page: 'admin-categories',
        total: totalCategoriesDB,
        showChart: true,
        order: 3,
        labelTooltip: 'categoriasDadasDeAlta',
        range: [from, until],
        totalLastWeek: categoriesDB.reduce((a, b) => a + b.total, 0),
        data: categoriesDB
      };
  
      res.json(users);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'An error occurred',
        error,
      });
    }
  };
};

export default CategoryController;
