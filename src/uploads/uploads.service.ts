import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Upload } from "./upload.entity";
import { UploadRepository } from "./uploads.constants";

@Injectable()
export class UploadsService {
    constructor(@Inject(UploadRepository) private uploadRepository: typeof Upload) {}
    
    async saveLocalFileData(fileData: LocalFileDto) {
        const newFile = await this.uploadRepository.create({...fileData});
        await newFile.save();
        return newFile;
    }

    async getOneFileById(fileId:any) {
        const file = await this.uploadRepository.findOne(fileId);

        if(!file) {
            throw new NotFoundException("File not found...");
        }

        return file;
    }
}