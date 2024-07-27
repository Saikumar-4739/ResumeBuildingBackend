import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.services';
import { UserCreateRequest } from './models/user-create.request';
import { UserIdRequest } from './models/userid.request';
import { UserResponse } from './models/user.response';
import { UserDetailedInfoResponse } from './models/user-detailed-info.response';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  async createUser(@Body() userData: UserCreateRequest): Promise<UserResponse> {
    return this.userService.createUser(userData);
  }

  @Post('/getUsersByUserIds')
  async getUsersByUserIds(@Body() req:  { userId: number[] }): Promise<UserDetailedInfoResponse> {
    return this.userService.getUsersByUserIds(req);
  }

  @Post('/deleteUsersByUserIds')
  async deleteUsersByUserIds(
    @Body() req: UserIdRequest
  ): Promise<UserResponse> {
    return this.userService.deleteUsersByUserIds(req);
  }

  @Post('/updateUser')
  async updateUser(@Body() req: UserCreateRequest): Promise<UserResponse> {
    return this.userService.updateUser(req);
  }
}
