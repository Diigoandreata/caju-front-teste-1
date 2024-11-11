import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateRegistrationDTO } from "~/types/registrations";
import { api } from "~/utils/api";

const updateRegistrationStatus = async ({
  body,
  status,
}: UpdateRegistrationDTO) => {
  const { data } = await api.put(`/registrations/${body.id}`, {
    ...body,
    status,
  });

  return data;
};

export const useUpdateRegistrationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateRegistrationDTO) => updateRegistrationStatus(body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["registrations"] }),
  });
};
