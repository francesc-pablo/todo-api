import multer from "multer"
import {multerSaveFilesOrg} from "multer-savefilesorg"

// saving files locally
export const localUpload = multer ({dest: 'uploads/'});
// saving files remotely
export const remoteUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/todo-api/todos/*'
    }),
    preservePath: true
});