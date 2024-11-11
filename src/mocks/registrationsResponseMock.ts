import {
  RegistrationResponse,
  RegistrationStatusEnum,
} from "~/types/registrations";

export const registrationsResponseMock: RegistrationResponse[] = [
  {
    admissionDate: "22/10/2023",
    email: "luiz@caju.com.br",
    employeeName: "Luiz Filho",
    status: RegistrationStatusEnum.Review,
    cpf: "44609971003",
    id: "3",
  },
  {
    id: "1",
    admissionDate: "22/10/2023",
    email: "filipe@caju.com.br",
    employeeName: "Filipe Marins",
    status: RegistrationStatusEnum.Approved,
    cpf: "71851294007",
  },
  {
    id: "2",
    admissionDate: "22/10/2023",
    email: "jose@caju.com.br",
    employeeName: "José Leão",
    status: RegistrationStatusEnum.Reproved,
    cpf: "23747491006",
  },
];
