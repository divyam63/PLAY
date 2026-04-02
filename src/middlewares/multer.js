import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/temp"); //files will be stored in uploads folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); //filename will be unique
    }
});

export const upload = multer({ storage });


