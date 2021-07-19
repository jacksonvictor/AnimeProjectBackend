import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>
  ) {}

  async listarTodos(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  async criar(user: User): Promise<User> {
    const UserCriado = new this.UserModel(user);

    return UserCriado.save();
  }

  async buscarPorId(id: string): Promise<User> {
    return this.UserModel.findById(id).exec();
  }

  async buscarPorLogin(login: string): Promise<User> {
    return this.UserModel.findOne({login},'_id login favoritos').exec();
  }

  async login(login:string): Promise<User>{
    return this.UserModel.findOne({login}).exec()
  } 

  async atualizar(id: string, user: User): Promise<User> {
    return this.UserModel.findByIdAndUpdate(id, user).exec();
  }

  async remover(id: string) {
    const UserApagado = this.UserModel.findOneAndDelete({ _id: id }).exec();

    return (await UserApagado).remove();
  }
}
