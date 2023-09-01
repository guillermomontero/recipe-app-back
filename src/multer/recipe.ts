import multer from 'multer';
import path from "node:path";

const storageRecipe = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/images/recipe'))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

export default storageRecipe;