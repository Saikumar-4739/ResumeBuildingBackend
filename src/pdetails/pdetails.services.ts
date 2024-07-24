import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import   PersonalDetails  from './pdetails.entity';
import   PersonalDetailsCreateRequest  from './pdcreate.model';
import   PersonalDetailsUpdateRequest from './pdupdate.model';

@Injectable()
export class PersonalDetailsService {
  constructor(
    @InjectRepository(PersonalDetails)
    private detailsRepository: Repository<PersonalDetails>,
  ) {}

  async createPersonalDetails(
    detailsData: PersonalDetailsCreateRequest,
  ): Promise<PersonalDetails> {
    const personalDetails = this.detailsRepository.create(detailsData);
    return this.detailsRepository.save(personalDetails);
  }

  async updatePersonalDetails(
    userId: number,
    detailsData: PersonalDetailsUpdateRequest,
  ): Promise<PersonalDetails> {
    await this.detailsRepository.update({ userId }, detailsData);
    return this.detailsRepository.findOne({ where: { userId } });
  }

  async getPersonalDetails(userId: number): Promise<PersonalDetails> {
    return this.detailsRepository.findOne({ where: { userId } });
  }

  async deletePersonalDetails(userId: number): Promise<void> {
    await this.detailsRepository.delete({ userId });
  }
}
