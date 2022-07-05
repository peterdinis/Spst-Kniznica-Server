import {Admin} from "./admin.entity";
import {AdminRepository} from "./admin.constants";

export const adminProviders = [{
    provide: AdminRepository,
    useValue: Admin
}]