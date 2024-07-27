import { Controller, Post, Body } from '@nestjs/common';
import { DeclarationService } from './declaration.services';
import   DeclarationCreateRequest  from './models/declaration.create.request';
import DeclarationResponse from './models/declaration.response';


@Controller('declarations')
export class DeclarationController {
  constructor(private readonly declarationService: DeclarationService) {}

  @Post('/create')
  async createDeclaration(@Body() declarationData: DeclarationCreateRequest): Promise<DeclarationResponse> {
    return this.declarationService.createDeclaration(declarationData);
  }

  @Post('/getAll')
  async getAllDeclarations(): Promise<DeclarationResponse> {
    return this.declarationService.getAllDeclarations();
  }

  @Post('/getById')
  async getDeclarationById(@Body() body: { id: number }): Promise<DeclarationResponse> {
    return this.declarationService.getDeclarationById(body.id);
  }

  @Post('/update')
  async updateDeclaration(
    @Body() body: { id: number; data: DeclarationCreateRequest }
  ): Promise<DeclarationResponse> {
    return this.declarationService.updateDeclaration(body.id, body.data);
  }

  @Post('/delete')
  async deleteDeclaration(@Body() body: { id: number }): Promise<DeclarationResponse> {
    return this.declarationService.deleteDeclaration(body.id);
  }
}
