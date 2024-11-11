import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/utils/api";

const deleteRegistration = async (id: string) => {
  const { data } = await api.delete(`/registrations/${id}`);

  return data;
};

export const useDeleteRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRegistration(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["registrations"] }),
  });
};
