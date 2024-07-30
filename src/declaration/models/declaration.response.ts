import DeclarationEntities from "../declaration.entities";


class DeclarationResponse {
    status: boolean;   
    internalMessage: string; 
    data: DeclarationEntities | DeclarationEntities[] | null; 
    errorCode: number;    
  }
  
export default DeclarationResponse;