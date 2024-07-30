import { NumericType } from "typeorm";

class PersonalDetailsModel {
    detailsId: number;
    userId?: number;
    fatherName: string;
    motherName: string;
    dateOfBirth: Date; 
    maritalStatus: string;
    languagesKnown: string[];
  }

export default PersonalDetailsModel;