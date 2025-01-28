import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {

    async uploadFile(file:Express.Multer.File)
    {
        console.log(file)
        return {
            originalname:file.originalname,
            filename:file.filename,
            size:file.size,
            mimetype:file.mimetype
        }
    }
}
