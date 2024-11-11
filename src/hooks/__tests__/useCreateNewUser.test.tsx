import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react";
import { useCreateNewUser } from "~/hooks/newUser/useCreateNewUser";
import { createNewUserMock } from "~/mocks/createNewUserMock";
import { api } from "~/utils/api";

jest.mock("~/utils/api");

type WrapperProps = {
  children: string;
};

const queryClient = new QueryClient();
const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

it("calls create new user hook", async () => {
  api.post = jest.fn(() => ({ data: createNewUserMock })) as jest.Mock;

  const { result, waitFor } = renderHook(() => useCreateNewUser(), {
    wrapper,
  });

  act(() => {
    result.current.mutate(createNewUserMock);
  });

  await waitFor(() => {
    return result.current.isSuccess;
  });

  expect(result.current.isSuccess).toBe(true);
});
