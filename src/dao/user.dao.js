import { BaseDAO } from "./base.dao.js"
import { User } from "../config/models/user.model.js"

export class UserDAO extends BaseDAO {
    constructor() {super(User)}
}