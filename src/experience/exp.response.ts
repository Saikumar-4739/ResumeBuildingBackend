import ExperienceModel from "./exp.model";

class ExperienceResponse {
    status: boolean;
    internalMessage: string;
    data: ExperienceModel[] | null;
    errorCode: number;
  }
  
export default ExperienceResponse;