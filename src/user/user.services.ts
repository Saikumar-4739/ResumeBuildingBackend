import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entities';
import { UserCreateRequest } from './models/user-create.request';
import { UserIdRequest } from './models/userid.request';
import { UserModel } from './models/user.model';
import { UserResponse } from './models/user.response';
import { AddressModel } from './models/address.model';
import { AddressService } from '../address/address.services';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userEntity: Repository<User>,
    private addressService: AddressService
  ) {}

  async createUser(userData: UserCreateRequest): Promise<UserResponse> {
    if (
      !userData.address ||
      !Array.isArray(userData.address) ||
      userData.address.length === 0
    ) {
      return {
        status: false,
        internalMessage: 'Address is missing or invalid',
        data: null,
        errorCode: 2,
      };
    }
  
    const existingUser = await this.userEntity.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      return {
        status: false,
        internalMessage: 'User with this email already exists',
        data: null,
        errorCode: 4,
      };
    }
  
    const newUser = this.userEntity.create({
      name: userData.uname,
      email: userData.email,
      mobile: userData.mobileNo,
    });
  
    try {
      await this.addressService.createAddress(userData.address[0]);
    } catch (error) {
      return {
        status: false,
        internalMessage: 'Failed to save address',
        data: null,
        errorCode: 3,
      };
    }
  
    const savedUser = await this.userEntity.save(newUser);
  
    const userModel: UserModel = {
      userId: savedUser.userId,
      uname: savedUser.name,
      email: savedUser.email,
      mobileNo: savedUser.mobile,
      createdate: savedUser.createdate,
      address: userData.address[0],
      experience: null, 
      academics: null, 
      skills: null, 
      personaldetails: null, 
    };
  
    return {
      status: true,
      internalMessage: 'User saved successfully',
      data: [userModel],
      errorCode: 0,
    };
  }

  async getUsersByUserIds(req: UserIdRequest): Promise<UserResponse> {
    try {
      const userIds = req.userId;

      // Fetch users by IDs
      const users = await this.userEntity.findByIds(userIds);

      if (!Array.isArray(users) || users.length === 0) {
        return {
          status: false,
          internalMessage: 'No users found for the provided IDs',
          data: [],
          errorCode: 1,
        };
      }

      const userModels: UserModel[] = [];
      for (const user of users) {
        // Fetch the address for each user
        const address = await this.addressService.getAddressOfUserId(
          user.userId
        );
        if (!address) {
          continue; // Skip this user if address not found
        }
        const addressModel = new AddressModel();
        addressModel.addressId = address.addressId;
        addressModel.city = address.city;
        addressModel.country = address.country;
        addressModel.street = address.street;
        addressModel.zipcode = address.zipcode;

        // Populate the UserModel
        const userModel = new UserModel();
        userModel.userId = user.userId;
        userModel.uname = user.name;
        userModel.email = user.email;
        userModel.mobileNo = user.mobile;
        userModel.createdate = user.createdate;
        userModel.address = addressModel;

        userModels.push(userModel);
      }

      return {
        status: true,
        internalMessage: 'Users retrieved successfully',
        data: userModels,
        errorCode: 0,
      };
    } catch (error) {
      // Log the error for debugging
      console.error('Error fetching users:', error);
      return {
        status: false,
        internalMessage: 'An error occurred while retrieving users',
        data: [],
        errorCode: 500,
      };
    }
  }

  async deleteUsersByUserIds(req: UserIdRequest): Promise<UserResponse> {
    const userIds = req.userId;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return {
        status: false,
        internalMessage: 'No user IDs provided or invalid format',
        data: null,
        errorCode: 1,
      };
    }

    try {
      await this.userEntity.delete(userIds);
    } catch (error) {
      return {
        status: false,
        internalMessage: 'Failed to delete users',
        data: null,
        errorCode: 2,
      };
    }

    return {
      status: true,
      internalMessage: 'Users deleted successfully',
      data: null,
      errorCode: 0,
    };
  }

  async getAllUsers(): Promise<UserResponse> {
    try {
      const users = await this.userEntity.find();

      const userModels: UserModel[] = await Promise.all(
        users.map(async (user) => {
          // Write a query to address table and get the address
          const address = await this.addressService.getAddressOfUserId(
            user.userId
          );
          const addressModel = new AddressModel();
          addressModel.addressId = address.addressId;
          addressModel.city = address.city;
          addressModel.country = address.country;
          addressModel.street = address.street;
          addressModel.zipcode = address.zipcode;

          const userInfo = new UserModel();
          userInfo.userId = user.userId;
          userInfo.email = user.email;
          userInfo.mobileNo = user.mobile;
          userInfo.createdate = user.createdate;
          userInfo.address = addressModel;

          return userInfo;
        })
      );

      return {
        status: true,
        internalMessage: 'Users retrieved successfully',
        data: userModels,
        errorCode: 0,
      };
    } catch (error) {
      return {
        status: false,
        internalMessage: 'Failed to retrieve users',
        data: [],
        errorCode: 1,
      };
    }
  }

  async updateUser(req: UserCreateRequest): Promise<UserResponse> {
    const userToUpdate = await this.userEntity.findOne({
      where: { userId: req.userId },
    });
  
    if (!userToUpdate) {
      return {
        status: false,
        internalMessage: 'User not found',
        data: [],
        errorCode: 1,
      };
    }
  
    userToUpdate.name = req.uname;
    userToUpdate.email = req.email;
    userToUpdate.mobile = req.mobileNo;
  
    // Ensure req.address exists and is not empty
    if (req.address && req.address.length > 0) {
      await this.addressService.updateAddress(req.address[0]);
    }
  
    const updatedUser = await this.userEntity.save(userToUpdate);
  
    const userModel: UserModel = {
      userId: updatedUser.userId,
      uname: updatedUser.name,
      email: updatedUser.email,
      mobileNo: updatedUser.mobile,
      createdate: updatedUser.createdate,
      address: req.address && req.address.length > 0 ? req.address[0] : null, // Ensure address is taken from req
      experience: updatedUser.experience, 
      academics: updatedUser.academics, 
      skills: updatedUser.skills, 
      personaldetails: updatedUser.personaldetails,
    };
  
    return {
      status: true,
      internalMessage: 'User updated successfully',
      data: [userModel],
      errorCode: 0,
    };
  }
}
