import { NewUserDTO } from "~/schemas/newUserSchema";
import { RegistrationStatusEnum } from "~/types/registrations";

export const createNewUserMock: NewUserDTO = {
  admissionDate: "22/10/2024",
  email: "teste@caju.com.br",
  employeeName: "Teste Mock",
  status: RegistrationStatusEnum.Review,
  cpf: "64520168066",
};
