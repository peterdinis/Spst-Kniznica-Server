import {Upload}from "./upload.entity";
import {UploadRepository} from "./uploads.constants";

export const uploadProviders = [{
    provide: UploadRepository,
    useValue: Upload
}]