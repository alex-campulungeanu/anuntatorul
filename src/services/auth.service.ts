import { PrismaClient, User } from "@prisma/client";
import { compare, hash } from 'bcrypt'
import config from 'config'
import { sign } from "jsonwebtoken";

import { CreateUserDto } from '../dtos/user.dto'
import { HttpException } from '../exceptions/http.exception'
import { TokenPayload } from '../interfaces/auth.interface'

class AuthService {
  private users = new PrismaClient().user

  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.users.findUnique({where: {email: userData.email}})
    if(findUser) {
      throw new HttpException(409, `Email ${userData.email} already exists !`)
    }
    const hashedPassword: string = await hash(userData.password, 10)
    const createUserData: User = await this.users.create({data: {...userData, password: hashedPassword}})
    return createUserData
  }

  public async login(userData: CreateUserDto): Promise<{token: string, findUser: User}> {
    const findUser: User = await this.users.findUnique({where: {email: userData.email}})
    if (!findUser) {
      throw new HttpException(401, `Email ${userData.email} not found !`)
    }
    const isPasswordMatching: boolean = await compare(userData.password, findUser.password)
    if (!isPasswordMatching) {
      throw new HttpException(401, "Incorrect password")
    }
    const token = this.createToken(findUser)

    return {token, findUser}
  }

  private createToken(user: User): string {
    const tokenPayload: {id: number} = {id: user.id}
    const {secretKey, expiresIn}: {secretKey: string, expiresIn: number} = config.get('jwt')
    const signedJwt = sign(tokenPayload, secretKey, {expiresIn})

    return signedJwt

  }
}

export default AuthService