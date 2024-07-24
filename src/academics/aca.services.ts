import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Academic from './acad.entities';
import AcademicCreateRequest from './aca.createreq';
import AcademicIdRequest from './aca.idreq';
import AcademicModel from './acad.model';
import AcademicResponse from './aca.response';

@Injectable()
export class AcademicService {
  constructor(
    @InjectRepository(Academic) private academicRepo: Repository<Academic>,
  ) {}

  async createAcademic(academicData: AcademicCreateRequest): Promise<AcademicResponse> {
    const newAcademic = this.academicRepo.create(academicData);

    try {
      const savedAcademic = await this.academicRepo.save(newAcademic);
      const academicModel: AcademicModel = {
        academicId: savedAcademic.academicId,
        institutionName: savedAcademic.institutionName,
        passingYear: savedAcademic.passingYear,
        qualification: savedAcademic.qualification,
        university: savedAcademic.university,
        percentage: savedAcademic.percentage,
      };

      return {
        status: true,
        internalMessage: 'Academic record created successfully',
        data: [academicModel],  // Adjusted to single item
        errorCode: 0,
      };
    } catch (error) {
      return {
        status: false,
        internalMessage: 'Failed to create academic record',
        data: null,
        errorCode: 1,
      };
    }
  }

  async getAcademicsByIds(req: AcademicIdRequest): Promise<AcademicResponse> {
    try {
      // Ensure req.academicId is an array and not empty
      if (!Array.isArray(req.academicId) || req.academicId.length === 0) {
        return {
          status: false,
          internalMessage: 'Invalid or empty academicId array',
          data: null,
          errorCode: 1,
        };
      }

      // Fetch records with the given IDs
      const academics = await this.academicRepo.find({
        where: {
          academicId: In(req.academicId),
        },
      });

      if (academics.length === 0) {
        return {
          status: false,
          internalMessage: 'No academic records found for the provided IDs',
          data: null,
          errorCode: 1,
        };
      }

      // Map fetched records to the AcademicModel
      const academicModels: AcademicModel[] = academics.map(academic => ({
        academicId: academic.academicId,
        institutionName: academic.institutionName,
        passingYear: academic.passingYear,
        qualification: academic.qualification,
        university: academic.university,
        percentage: academic.percentage,
      }));

      return {
        status: true,
        internalMessage: 'Academic records retrieved successfully',
        data: academicModels,
        errorCode: 0,
      };
    } catch (error) {
      // Handle unexpected errors
      console.error('Error retrieving academic records:', error);
      return {
        status: false,
        internalMessage: 'Error retrieving academic records',
        data: null,
        errorCode: 2,
      };
    }
  }

  async deleteAcademicsByIds(req: AcademicIdRequest): Promise<AcademicResponse> {
    try {
      await this.academicRepo.delete(req.academicId);
      return {
        status: true,
        internalMessage: 'Academic records deleted successfully',
        data: null,
        errorCode: 0,
      };
    } catch (error) {
      return {
        status: false,
        internalMessage: 'Failed to delete academic records',
        data: null,
        errorCode: 1,
      };
    }
  }

  async updateAcademic(academicData: AcademicCreateRequest & { academicId: number }): Promise<AcademicResponse> {
    try {
      const academic = await this.academicRepo.findOneBy({ academicId: academicData.academicId });

      if (!academic) {
        return {
          status: false,
          internalMessage: 'Academic record not found',
          data: null,
          errorCode: 1,
        };
      }

      Object.assign(academic, academicData);
      const updatedAcademic = await this.academicRepo.save(academic);

      const academicModel: AcademicModel = {
        academicId: updatedAcademic.academicId,
        institutionName: updatedAcademic.institutionName,
        passingYear: updatedAcademic.passingYear,
        qualification: updatedAcademic.qualification,
        university: updatedAcademic.university,
        percentage: updatedAcademic.percentage,
      };

      return {
        status: true,
        internalMessage: 'Academic record updated successfully',
        data: [academicModel],  // Adjusted to single item
        errorCode: 0,
      };
    } catch (error) {
      return {
        status: false,
        internalMessage: 'Failed to update academic record',
        data: null,
        errorCode: 2,
      };
    }
  }
}
