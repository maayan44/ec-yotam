import multer from "multer";

// Allowed image MIME types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE_MB = 5

// Storage: keep original filename for Cloudinary upload
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
})

// File type validation — rejects anything that isn't an image
const fileFilter = (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
        return cb(new Error('סוג קובץ לא מורשה. ניתן להעלות תמונות בלבד (JPEG, PNG, WEBP, GIF)'))
    }
    cb(null, true)
}

const upload = multer({
    storage,
    limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
    fileFilter
})

export default upload