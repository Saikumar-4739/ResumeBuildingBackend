import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserDetailedInfoQueryResponse } from "../models/ueer-detailed-info.query.response";
import DeclarationEntities from "src/declaration/declaration.entities";
import PersonalDetailsEntities from "src/personal-details/personal-details.entities";
import UserEntity from "../user.entities";
import SkillEntities from "src/skills/skills.entities";
import AcademicEntities from "src/academics/academics.entities";
import Experienceentities from "src/experience/experience.entities";
import AddressEntities from "src/address/address.entities";

@Injectable()
export class UserRepo extends Repository <UserEntity> {
    constructor(private datasource: DataSource) {
        super(UserEntity, datasource.createEntityManager());
    }

    async getUsers(): Promise<UserDetailedInfoQueryResponse[]> {
        const queryBuilder = this.createQueryBuilder('u')
            .select(`u.name , u.email, u.mobile, u.createdate, 
            a.street, a.city,a.state,a.country,a.zipcode,
            e.objective,e.companyName,e.role,e.fromYear,e.toYear,e.description,
            a2.institutionName,a2.passingYear,a2.qualification,a2.university,a2.percentage,
            s.skillName,s.department, 
            pd.fatherName,pd.motherName,pd.dateOfBirth,pd.maritalStatus,pd.languagesKnown,
            d.date,d.place`)
            .leftJoin(AddressEntities,'a','a.userid  = u.user_id ')
            .leftJoin(Experienceentities,'e','e.userid = u.user_id')
            .leftJoin(AcademicEntities,'a2','a2.userId = u.user_id')
            .leftJoin(SkillEntities,'s','s.userId = u.user_id')
            .leftJoin(PersonalDetailsEntities,'pd','pd.userId = u.user_id')
            .leftJoin(DeclarationEntities,'d','d.userId = u.user_id')
        
            return await queryBuilder.getRawMany()
}

}
