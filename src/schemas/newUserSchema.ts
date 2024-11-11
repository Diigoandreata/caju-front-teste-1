import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import { z } from "zod";
import { RegistrationStatusEnum } from "~/types/registrations";

export const newUserSchema = z.object({
  employeeName: z
    .string({ message: "Campo obrigatório" })
    .min(2, { message: "Campo obrigatório" })
    .refine((value) => /^[A-Za-z]/.test(value.trim()), {
      message: "O nome não pode começar com um número",
    })
    .refine((value) => /\w+\s+\w+/.test(value.trim()), {
      message: "Insira seu nome completo",
    }),
  admissionDate: z.string({ message: "Campo obrigatório" }),
  email: z
    .string({ message: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" })
    .email({ message: "Formato de e-mail incorreto" }),
  cpf: z
    .string({ message: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" })
    .refine((value) => isValidCPF(value), {
      message: "CPF inválido",
    }),
  status: z.nativeEnum(RegistrationStatusEnum).optional(),
});

export type NewUserDTO = z.infer<typeof newUserSchema>;
