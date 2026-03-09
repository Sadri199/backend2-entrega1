import { UserDAO } from "../dao/user.dao.js"
import { CartDAO } from "../dao/cart.dao.js"
import { createUser, 
    checkEmail, 
    dataFilter, 
    checkPassword,
    dataFilterAdmin, 
    temporalToken,
    getUserById,
    resetPasswordData,
    formatPassword} from "../dao/dto/user.dto.js"


class UserService{
    constructor (dao = new UserDAO(), daoCart = new CartDAO()) {
        this.dao = dao
        this.daoCart = daoCart
    }

    async userCreate(data) {return await this.dao.create(createUser(data))}

    async emailCheck(data) {
        const validate = await this.dao.findOne(checkEmail(data))
        return dataFilter(validate)}

    async updateTempToken(id, token) {
        return await this.dao.findByIdAndUpdate(getUserById(id),
        temporalToken(token))
    }

    async getTempToken(id) {
        const validate = await this.dao.findById(getUserById(id))
        return resetPasswordData(validate)}

    async updatePassword(id, data) {
        return await this.dao.findByIdAndUpdate(getUserById(id),
        formatPassword(data),{
            new:true,
            upsert: true
        })
    }

    passwordCheck(data) {return checkPassword(data)}

    filterData(data) {return dataFilter(data)}

    filterAdminData(data) {return dataFilterAdmin(data)}

}

export const userService = new UserService()