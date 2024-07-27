import { IsNumber } from 'class-validator';

class ExperienceIdRequest {
  @IsNumber({}, { each: true })
  experienceId: number[];
}

export default ExperienceIdRequest;