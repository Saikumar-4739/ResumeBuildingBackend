import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserDetailedInfoQueryResponse } from "../models/ueer-detailed-info.query.response";
import UserEntity from "../user.entities";
import AddressEntities from "../../address/address.entities";
import Experienceentities from "../../experience/experience.entities";
import AcademicEntities from "../../academics/academics.entities";
import Skill from "../../skills/skills.entities";
import PersonalDetailsEntities from "../../personal-details/personal-details.entities";
import DeclarationEntities from "../../declaration/declaration.entities";


@Injectable()
export class UserRepo extends Repository <UserEntity> {
    constructor(private datasource: DataSource) {
        super(UserEntity, datasource.createEntityManager());
    }

    async getUsers(userIds: number[]): Promise<UserDetailedInfoQueryResponse[]> {
        const queryBuilder = this.createQueryBuilder('u')
            .select(`u.name , u.email, u.mobile, u.createdate, 
            a.street, a.city,a.state,a.country,a.zipcode,
            e.objective,e.companyName,e.role,e.fromYear,e.toYear,e.description,
            a2.institutionName,a2.passingYear,a2.qualification,a2.university,a2.percentage,
            s.skillName,s.department, 
            pd.fatherName,pd.motherName,pd.dateOfBirth,pd.maritalStatus,pd.languagesKnown,
            d.declration,d.place`)
            .leftJoin(AddressEntities,'a','a.userid  = u.user_id ')
            .leftJoin(Experienceentities,'e','e.userid = u.user_id')
            .leftJoin(AcademicEntities,'a2','a2.userId = u.user_id')
            .leftJoin(Skill,'s','s.userId = u.user_id')
            .leftJoin(PersonalDetailsEntities,'pd','pd.userId = u.user_id')
            .leftJoin(DeclarationEntities,'d','d.userId = u.user_id')
            return await queryBuilder.getRawMany()
}
}
