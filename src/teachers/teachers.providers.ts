import {Teacher} from "./teachers.entity";
import { TeacherRepository } from "./teachers.constants";

export const teacherProviders = [{
    provide: TeacherRepository,
    useValue: Teacher
}]