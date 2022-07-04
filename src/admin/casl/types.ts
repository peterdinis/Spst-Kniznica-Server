import { InferSubjects, Ability } from "@casl/ability";
import { User} from "src/users/user.entity";
import { Action } from "./actions";
import {Book} from "src/book/book.entity";
import {Category} from "src/category/category.entity";

type Subjects = InferSubjects<typeof Book | typeof Category | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;