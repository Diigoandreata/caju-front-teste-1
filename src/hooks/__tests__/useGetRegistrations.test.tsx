import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { useGetRegistrations } from "~/hooks/dashboard/useGetRegistrations";

import { registrationsResponseMock } from "~/mocks/registrationsResponseMock";
import { api } from "~/utils/api";

jest.mock("~/utils/api");

type WrapperProps = {
  children: string;
};

const queryClient = new QueryClient();
const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

it("calls registrations hook", async () => {
  api.get = jest.fn(() => ({ data: registrationsResponseMock })) as jest.Mock;

  const { result, waitFor } = renderHook(
    () => useGetRegistrations({ cpf: "" }),
    { wrapper }
  );

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data).toEqual(registrationsResponseMock);
});
