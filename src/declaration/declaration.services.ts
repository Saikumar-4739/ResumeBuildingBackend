import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DeclarationEntities from './declaration.entities';
import DeclarationCreateRequest from './models/declaration.create.request'; 
import DeclarationResponse from './models/declaration.response';


@Injectable()
export class DeclarationService {
  constructor(
    @InjectRepository(DeclarationEntities)
    private readonly declarationRepository: Repository<DeclarationEntities>,
  ) {}

  async createDeclaration(declarationData: DeclarationCreateRequest): Promise<DeclarationResponse> {
    try {
      const newDeclaration = this.declarationRepository.create(declarationData);
      const savedDeclaration = await this.declarationRepository.save(newDeclaration);
  
      return {
        status: true,
        internalMessage: 'Declaration created successfully',
        data: [savedDeclaration], // Directly returning the saved entity
        errorCode: 0,
      };
    } catch (error) {
      console.error('Error creating declaration:', error);
      return {
        status: false,
        internalMessage: 'Failed to create declaration',
        data: null,
        errorCode: 1,
      };
    }
  }

  async getAllDeclarations(): Promise<DeclarationResponse> {
    try {
      const declarations = await this.declarationRepository.find();
      return {
        status: true,
        internalMessage: 'Declarations retrieved successfully',
        data: declarations,
        errorCode: 0,
      };
    } catch (error) {
      console.error('Error retrieving declarations:', error);
      return {
        status: false,
        internalMessage: 'Failed to retrieve declarations',
        data: [],
        errorCode: 1,
      };
    }
  }

  async getDeclarationById(id: number): Promise<DeclarationResponse> {
    try {
      const declaration = await this.declarationRepository.findOne({
        where: { declarationId: id }, // Adjusted to match the entity's column name
      });
      
      if (!declaration) {
        return {
          status: false,
          internalMessage: 'Declaration not found',
          data: null,
          errorCode: 1,
        };
      }
      return {
        status: true,
        internalMessage: 'Declaration retrieved successfully',
        data: declaration,
        errorCode: 0,
      };
    } catch (error) {
      console.error('Error retrieving declaration:', error);
      return {
        status: false,
        internalMessage: 'Failed to retrieve declaration',
        data: null,
        errorCode: 1,
      };
    }
  }

  async updateDeclaration(id: number, updateData: DeclarationCreateRequest): Promise<DeclarationResponse> {
    try {
      const declaration = await this.declarationRepository.findOne({
        where: { declarationId: id }, // Adjusted to match the entity's column name
      });
      
      if (!declaration) {
        return {
          status: false,
          internalMessage: 'Declaration not found',
          data: null,
          errorCode: 1,
        };
      }

      this.declarationRepository.merge(declaration, updateData);
      const updatedDeclaration = await this.declarationRepository.save(declaration);

      return {
        status: true,
        internalMessage: 'Declaration updated successfully',
        data: updatedDeclaration,
        errorCode: 0,
      };
    } catch (error) {
      console.error('Error updating declaration:', error);
      return {
        status: false,
        internalMessage: 'Failed to update declaration',
        data: null,
        errorCode: 1,
      };
    }
  }

  async deleteDeclaration(id: number): Promise<DeclarationResponse> {
    try {
      const result = await this.declarationRepository.delete(id);
      if (result.affected === 0) {
        return {
          status: false,
          internalMessage: 'Declaration not found',
          data: null,
          errorCode: 1,
        };
      }
      return {
        status: true,
        internalMessage: 'Declaration deleted successfully',
        data: null,
        errorCode: 0,
      };
    } catch (error) {
      console.error('Error deleting declaration:', error);
      return {
        status: false,
        internalMessage: 'Failed to delete declaration',
        data: null,
        errorCode: 1,
      };
    }
  }
}
