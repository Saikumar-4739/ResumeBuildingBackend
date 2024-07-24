import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Experience from './exp.entities';
import { ExperienceCreateRequest } from './exp.createrequest';
import ExperienceIdRequest  from './exp-id.request';
import ExperienceModel  from './exp.model';
import ExperienceResponse  from './exp.response';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience) private experienceRepo: Repository<Experience>,
  ) {}

  async createExperience(experienceData: ExperienceCreateRequest): Promise<ExperienceResponse> {

    const newExperience = this.experienceRepo.create(experienceData);
  
    try {
      const savedExperience = await this.experienceRepo.save(newExperience);
      const experienceModel: ExperienceModel = {
        experienceId: savedExperience.experienceId,
        objective: savedExperience.objective,
        companyName: savedExperience.companyName,
        role: savedExperience.role,
        fromYear: savedExperience.fromYear,
        toYear: savedExperience.toYear,
        description: savedExperience.description,
      };
  
      return {
        status: true,
        internalMessage: 'Experience created successfully',
        data: [experienceModel],
        errorCode: 0,
      };
    } catch (error) {
      console.error('Failed to create experience:', error); // Log error for debugging
      return {
        status: false,
        internalMessage: 'Failed to create experience',
        data: null,
        errorCode: 1,
      };
    }
  }
  

  async getExperiencesByIds(req: ExperienceIdRequest): Promise<ExperienceResponse> {
    try {
      const experiences = await this.experienceRepo.findByIds(req.experienceId);

      if (!experiences.length) {
        return {
          status: false,
          internalMessage: 'No experiences found for the provided IDs',
          data: null,
          errorCode: 1,
        };
      }

      const experienceModels: ExperienceModel[] = experiences.map(experience => ({
        experienceId: experience.experienceId,
        ...experience,
      }));

      return {
        status: true,
        internalMessage: 'Experiences retrieved successfully',
        data: experienceModels,
        errorCode: 0,
      };
    } catch (error) {
      return {
        status: false,
        internalMessage: 'Error retrieving experiences',
        data: null,
        errorCode: 2,
      };
    }
  }

  async deleteExperiencesByIds(req: ExperienceIdRequest): Promise<ExperienceResponse> {
    try {
      await this.experienceRepo.delete(req.experienceId);
      return {
        status: true,
        internalMessage: 'Experiences deleted successfully',
        data: null,
        errorCode: 0,
      };
    } catch (error) {
      return {
        status: false,
        internalMessage: 'Failed to delete experiences',
        data: null,
        errorCode: 1,
      };
    }
  }

  async updateExperience(experienceData: ExperienceCreateRequest & { experienceId: number }): Promise<ExperienceResponse> {
    try {
      // Find the experience entity by its primary key
      const experience = await this.experienceRepo.findOneBy({ experienceId: experienceData.experienceId });
  
      if (!experience) {
        return {
          status: false,
          internalMessage: 'Experience not found',
          data: null,
          errorCode: 1,
        };
      }
  
      // Update the entity properties
      Object.assign(experience, experienceData);
  
      // Save the updated entity
      const updatedExperience = await this.experienceRepo.save(experience);
  
      // Create a response model
      const experienceModel: ExperienceModel = {
        experienceId: updatedExperience.experienceId,
        objective: updatedExperience.objective,
        companyName: updatedExperience.companyName,
        role: updatedExperience.role,
        fromYear: updatedExperience.fromYear,
        toYear: updatedExperience.toYear,
        description: updatedExperience.description,
      };
  
      return {
        status: true,
        internalMessage: 'Experience updated successfully',
        data: [experienceModel],
        errorCode: 0,
      };
    } catch (error) {
      return {
        status: false,
        internalMessage: 'Failed to update experience',
        data: null,
        errorCode: 2,
      };
    }
  }
  
}
