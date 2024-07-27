import PersonalDetailsModel from "./personal-details.model";



class PersonalDetailsResponse {
  status: boolean;
  internalMessage: string;
  data: PersonalDetailsModel[] | null;
  errorCode: number;
}

export default PersonalDetailsResponse;