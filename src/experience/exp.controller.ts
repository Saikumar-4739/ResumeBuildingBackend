import { Controller, Post, Body, Get } from '@nestjs/common';
import { ExperienceService } from './exp.services';
import { ExperienceCreateRequest } from './exp.createrequest';
import ExperienceIdRequest  from './exp-id.request';
import ExperienceResponse  from './exp.response';

@Controller('experiences')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post('/createExp')
  async createExperience(@Body() experienceData: ExperienceCreateRequest): Promise<ExperienceResponse> {
    return this.experienceService.createExperience(experienceData);
  }

  @Post('/getByIds')
  async getExperiencesByIds(@Body() req: ExperienceIdRequest): Promise<ExperienceResponse> {
    return this.experienceService.getExperiencesByIds(req);
  }

  @Post('/deleteByIds')
  async deleteExperiencesByIds(@Body() req: ExperienceIdRequest): Promise<ExperienceResponse> {
    return this.experienceService.deleteExperiencesByIds(req);
  }

  @Post('/update')
  async updateExperience(@Body() experienceData: ExperienceCreateRequest & { experienceId: number }): Promise<ExperienceResponse> {
    return this.experienceService.updateExperience(experienceData);
  }
}
