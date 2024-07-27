import AcademicModel from "./academics.model";


class AcademicResponse {
  status: boolean;
  internalMessage: string;
  data: AcademicModel [ ] | null;
  errorCode: number;
}
export default AcademicResponse;