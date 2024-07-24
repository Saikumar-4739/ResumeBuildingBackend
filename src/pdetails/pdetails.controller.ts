import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { PersonalDetailsService } from './pdetails.services';
import  PersonalDetailsCreateRequest  from './pdcreate.model';
import  PersonalDetailsUpdateRequest  from './pdupdate.model';

@Controller('personal-details')
export class PersonalDetailsController {
  constructor(private readonly detailsService: PersonalDetailsService) {}

  @Post('/create')
  async createPersonalDetails(
    @Body() detailsData: PersonalDetailsCreateRequest,
  ) {
    return this.detailsService.createPersonalDetails(detailsData);
  }

  @Post('/update/:userId')
  async updatePersonalDetails(
    @Param('userId') userId: number,
    @Body() detailsData: PersonalDetailsUpdateRequest,
  ) {
    return this.detailsService.updatePersonalDetails(userId, detailsData);
  }

  @Get('/:userId')
  async getPersonalDetails(@Param('userId') userId: number) {
    return this.detailsService.getPersonalDetails(userId);
  }

  @Delete('/:userId')
  async deletePersonalDetails(@Param('userId') userId: number) {
    await this.detailsService.deletePersonalDetails(userId);
  }
}
