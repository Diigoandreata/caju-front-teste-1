import { useQuery } from "@tanstack/react-query";
import {
  RegistrationFilter,
  RegistrationResponse,
} from "~/types/registrations";
import { api } from "~/utils/api";

const getRegistrations = async ({
  cpf,
}: RegistrationFilter): Promise<RegistrationResponse[]> => {
  const { data } = await api.get("/registrations", { params: { cpf } });

  return data;
};

export const useGetRegistrations = ({ cpf }: RegistrationFilter) => {
  return useQuery<RegistrationResponse[]>({
    queryKey: ["registrations", { cpf }],
    queryFn: () => getRegistrations({ cpf }),
  });
};
