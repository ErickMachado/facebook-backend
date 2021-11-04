import multer from 'multer'
import { extname, resolve } from 'path'

const storage = multer.diskStorage({
  destination(request, file, callback) {
    callback(null, resolve(__dirname, '..', '..', 'temp'))
  },
  filename(request, { originalname }, callback) {
    callback(null, `${Date.now()}${extname(originalname)}`)
  }
})

const upload = multer({ storage })

export default upload
