import { Controller, Post, Body, Get } from '@nestjs/common';
import { AcademicService } from './aca.services';
import AcademicCreateRequest from './aca.createreq';
import AcademicIdRequest  from './aca.idreq';
import AcademicResponse  from './aca.response';

@Controller('academics')
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}

  @Post('/create')
  async createAcademic(@Body() academicData: AcademicCreateRequest): Promise<AcademicResponse> {
    return this.academicService.createAcademic(academicData);
  }

  @Post('/getByIds')
  async getAcademicsByIds(@Body() req: AcademicIdRequest): Promise<AcademicResponse> {
    return this.academicService.getAcademicsByIds(req);
  }

  @Post('/deleteByIds')
  async deleteAcademicsByIds(@Body() req: AcademicIdRequest): Promise<AcademicResponse> {
    return this.academicService.deleteAcademicsByIds(req);
  }

  @Post('/update')
  async updateAcademic(@Body() academicData: AcademicCreateRequest & { academicId: number }): Promise<AcademicResponse> {
    return this.academicService.updateAcademic(academicData);
  }
}
