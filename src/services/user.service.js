import { UserDAO } from "../dao/user.dao.js"
import { createUser, checkEmail, dataFilter } from "../dao/dto/user.dto.js"

class UserService{
    constructor (dao = new UserDAO()) {this.dao = dao}

    async userCreate(data) {return await this.dao.create(createUser(data))}
    async emailCheck(data) {return await this.dao.findOne(checkEmail(data))}

    filterData(data) {return dataFilter(data)}

    //función que busque email y valide el password
}

export const userService = new UserService()