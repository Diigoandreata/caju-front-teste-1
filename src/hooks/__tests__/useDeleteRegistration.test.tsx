import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react";
import { useDeleteRegistration } from "~/hooks/dashboard/useDeleteRegistration";
import { api } from "~/utils/api";

jest.mock("~/utils/api");

type WrapperProps = {
  children: string;
};

const queryClient = new QueryClient();
const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

it("calls delete registrations hook", async () => {
  api.delete = jest.fn(() => "1") as jest.Mock;

  const { result, waitFor } = renderHook(() => useDeleteRegistration(), {
    wrapper,
  });

  act(() => {
    result.current.mutate("1");
  });

  await waitFor(() => {
    return result.current.isSuccess;
  });

  expect(result.current.isSuccess).toBe(true);
});
