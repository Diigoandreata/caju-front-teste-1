import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewUserDTO } from "~/schemas/newUserSchema";
import { api } from "~/utils/api";

const createNewUser = async (body: NewUserDTO) => {
  const { data } = await api.post(`/registrations`, {
    ...body,
  });

  return data;
};

export const useCreateNewUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: NewUserDTO) => createNewUser(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["registrations"] }),
  });
};
