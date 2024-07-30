import { Injectable } from '@nestjs/common';
import { UserCreateRequest } from './models/user-create.request';
import { UserIdRequest } from './models/userid.request';
import { UserModel } from './models/user.model';
import { UserResponse } from './models/user.response';
import { AddressModel } from '../address/models/address.model';
import { AddressService } from '../address/address.services';
import {UserRepo} from './userrepo/user.repo'
import { UserDetailedInfoQueryResponse } from './models/ueer-detailed-info.query.response';
import UserEntity from './user.entities';
import { UserDetailedInfoResponse } from './models/user-detailed-info.response';
import UserDetailedInfoModel from './models/user-detailed-info.model';
import ExperienceModel from '../experience/models/exp.model';
import AcademicModel from '../academics/models/academics.model';
import SkillModel from '../skills/models/skills.model';
import PersonalDetailsModel from '../personal-details/models/personal-details.model';
import DeclarationModel from 'src/declaration/models/declaration.model';



@Injectable()
export class UserService {
  constructor(
    private UserRepo: UserRepo,
    private addressService: AddressService
  ) {}

  async createUser(userData: UserCreateRequest): Promise<UserResponse> {
    // Validate address
    if (!userData.address || !Array.isArray(userData.address) || userData.address.length === 0) {
      return {
        status: false,
        internalMessage: 'Address is missing or invalid',
        data: null,
        errorCode: 2,
      };
    }
  
  
    const existingUser = await this.UserRepo.findOne({ where: { email: userData.email } });
    if (existingUser) {
      return {
        status: false,
        internalMessage: 'User with this email already exists',
        data: null,
        errorCode: 4,
      };
    }
  
    let savedUser;
    try {
      savedUser = await this.UserRepo.save({
        name: userData.uname,
        email: userData.email,
        mobile: userData.mobileNo,
      });
    } catch (error) {
      return {
        status: false,
        internalMessage: 'Failed to save user',
        data: null,
        errorCode: 5,
      };
    }
  
    // Save address
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
  
  
    const userModel: UserModel = {
      userId: savedUser.userId,
      uname: savedUser.name,
      email: savedUser.email,
      mobileNo: savedUser.mobile,
      createdate: savedUser.createdate,
      address: userData.address[0],
    };
  
    return {
      status: true,
      internalMessage: 'User saved successfully',
      data: [userModel],
      errorCode: 0,
    };
  }
  
  
  async deleteUsersByUserIds(req: UserIdRequest): Promise<UserResponse> {
    const userIds = req.userId;

    if (!Array.isArray(userIds) || !userIds.length) {
      return {
        status: false,
        internalMessage: 'No user IDs provided or invalid format',
        data: null,
        errorCode: 1,
      };
    }

    try {
      await this.UserRepo.delete(userIds);
      return {
        status: true,
        internalMessage: 'Users deleted successfully',
        data: null,
        errorCode: 0,
      };
    } catch (error) {
      return {
        status: false,
        internalMessage: 'Failed to delete users',
        data: null,
        errorCode: 2,
      };
    }
  }


  async updateUser(req: UserCreateRequest): Promise<UserResponse> {
    try {
        // Ensure mobileNo is a number
        const mobileNo = Number(req.mobileNo);
        if (isNaN(mobileNo)) {
            return {
                status: false,
                internalMessage: 'Invalid mobile number format',
                data: [],
                errorCode: 4, // New error code for invalid mobile number
            };
        }

        const userToUpdate = await this.UserRepo.findOne({ where: { userId: req.userId } });

        if (!userToUpdate) {
            return {
                status: false,
                internalMessage: 'User not found',
                data: [],
                errorCode: 1,
            };
        }

        // Update user details
        userToUpdate.name = req.uname;
        userToUpdate.email = req.email;
        userToUpdate.mobile = mobileNo;

        // Update address if provided
        if (req.address && req.address.length > 0) {
            try {
                await this.addressService.updateAddress(req.address[0]);
            } catch (error) {
                return {
                    status: false,
                    internalMessage: 'Failed to update address',
                    data: [],
                    errorCode: 3,
                };
            }
        }

        // Save updated user
        const updatedUser = await this.UserRepo.save(userToUpdate);

        // Ensure createdate is a date
        const createdate = new Date(updatedUser.createdate);

        const userModel: UserModel = {
            userId: updatedUser.userId,
            uname: updatedUser.name,
            email: updatedUser.email,
            mobileNo: updatedUser.mobile,
            createdate: createdate, 
            address: req.address && req.address.length > 0 ? req.address[0] : null
        };

        return {
            status: true,
            internalMessage: 'User updated successfully',
            data: [userModel],
            errorCode: 0,
        };
    } catch (error) {
        return {
            status: false,
            internalMessage: 'Failed to update user',
            data: [],
            errorCode: 2,
        };
    }
  }


  async getUsersByUserIds(req: { userId: number[] }): Promise<UserDetailedInfoResponse> {
    try {
      const userIds = req.userId;
      const users = await this.UserRepo.getUsers(userIds);

      if (users.length === 0) {
        return {
          status: false,
          internalMessage: 'No users found for the provided IDs',
          data: [],
          errorCode: 404,
        };
      }

      const userDetailedModels: UserDetailedInfoModel[] = users.map(user => {
        const userDetailedModel = new UserDetailedInfoModel();
        userDetailedModel.userId = user.userId;
        userDetailedModel.name = user.name;
        userDetailedModel.email = user.email;
        userDetailedModel.mobile = user.mobile;
        userDetailedModel.createdate = user.createdate;

        const addr = new AddressModel();
        addr.street = user.street;
        addr.city = user.city;
        addr.state = user.state;
        addr.country = user.country;
        addr.zipcode = user.zipcode;
        userDetailedModel.address = addr;

        const expe = new ExperienceModel();
        expe.objective = user.objective;
        expe.companyName = user.companyName;
        expe.role = user.role;
        expe.fromYear = user.fromYear;
        expe.toYear = user.toYear;
        expe.description = user.description;
        userDetailedModel.experience = expe;

        const acade = new AcademicModel();
        acade.institutionName = user.institutionName;
        acade.passingYear = user.passingYear;
        acade.qualification = user.qualification;
        acade.university = user.university;
        acade.percentage = user.percentage;
        userDetailedModel.academic = acade;

        const skill = new SkillModel();
        skill.skillName = user.skillName;
        skill.department = user.department;
        userDetailedModel.skills = skill;

        const pdetails = new PersonalDetailsModel();
        pdetails.fatherName = user.fatherName;
        pdetails.motherName = user.motherName;
        pdetails.dateOfBirth = user.dateOfBirth;
        pdetails.maritalStatus = user.maritalStatus;
        pdetails.languagesKnown = user.languagesKnown;
        userDetailedModel.personalDetails = pdetails;

        const declare = new DeclarationModel();
        declare.place = user.place;
        declare.declration = user.declration;
        userDetailedModel.declaration = declare;

        return userDetailedModel;
      });

      return {
        status: true,
        internalMessage: 'Users retrieved successfully',
        data: userDetailedModels,
        errorCode: 0,
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      return {
        status: false,
        internalMessage: 'An error occurred while retrieving users',
        data: [],
        errorCode: 500,
      };
    }
  }
}