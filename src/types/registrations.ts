export enum RegistrationStatusEnum {
  Review = "REVIEW",
  Approved = "APPROVED",
  Reproved = "REPROVED",
}

export type RegistrationResponse = {
  admissionDate: string;
  cpf: string;
  email: string;
  employeeName: string;
  id: string;
  status: RegistrationStatusEnum;
};

export type UpdateRegistrationDTO = {
  body: RegistrationResponse;
  status: RegistrationStatusEnum;
};

export type RegistrationFilter = {
  cpf?: string;
};
