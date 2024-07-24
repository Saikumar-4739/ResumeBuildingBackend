import ExperienceModel from "src/experience/exp.model";
import {AddressModel } from "./address.model";
import AcademicModel from "src/academics/acad.model";
import SkillModel from "src/skills/skill.model";
import PersonalDetailsUpdateRequest from "src/pdetails/pdupdate.model";


export class UserModel {
    uname: string;
    email: string;
    mobileNo: string;
    createdate: string;
    userId?: number;
    address: AddressModel ;
    experience: ExperienceModel;
    academics: AcademicModel;
    skills: SkillModel;
    personaldetails: PersonalDetailsUpdateRequest;
}

