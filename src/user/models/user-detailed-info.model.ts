import ExperienceModel from "src/experience/models/exp.model";
import { AddressModel } from "../../address/models/address.model";
import AcademicModel from "src/academics/models/academics.model";
import SkillModel from "src/skills/models/skills.model";
import PersonalDetailsModel from "src/personal-details/models/personal-details.model";
import DeclarationModel from "src/declaration/models/declaration.model";

class UserDetailedInfoModel {
  userId?: number;
  name: string;
  email: string;
  mobile: number;
  createdate: Date;
  address: AddressModel;
  experience: ExperienceModel; 
  academic: AcademicModel; 
  skills: SkillModel; 
  personalDetails: PersonalDetailsModel;
  declaration : DeclarationModel;
}

export default UserDetailedInfoModel;
