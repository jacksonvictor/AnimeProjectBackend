import { Get } from '@nestjs/common';
import { Body, Controller, Delete, Param, Post, Put, Req } from '@nestjs/common';
import { User } from './user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get(":login")
  async buscarPorLogin(@Param('login') login: string): Promise<User> {
    return this.userService.buscarPorLogin(login)
  }

  @Post('login')
  async login(@Body() user: User): Promise<boolean> {
    return this.userService.login(user.login).then(result => {
      if (result && result.senha === user.senha) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    })
  }

  @Post()
  async criar(@Body() User: User): Promise<User> {
    return this.userService.criar(User);
  }

  @Put(':id')
  async atualizar(@Param('id') id: string, @Body() userAtualizado: User): Promise<User> {
    return this.userService.atualizar(id, userAtualizado);
  }

  

}
