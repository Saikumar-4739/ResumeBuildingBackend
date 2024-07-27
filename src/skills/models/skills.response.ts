import SkillModel from "./skills.model";


class SkillResponse {
    status: boolean;
    internalMessage: string;
    data: SkillModel[] | null;
    errorCode: number;
  }
  
export default SkillResponse;