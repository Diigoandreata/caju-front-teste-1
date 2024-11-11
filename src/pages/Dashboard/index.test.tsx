import { fireEvent, screen } from "@testing-library/react";
import DashboardPage from ".";
import { render } from "~/utils/render";
import { registrationsResponseMock } from "~/mocks/registrationsResponseMock";
import { RegistrationStatusEnum } from "~/types/registrations";

jest.mock("~/hooks/dashboard/useGetRegistrations", () => ({
  useGetRegistrations: () => ({
    isLoading: false,
    data: registrationsResponseMock,
  }),
}));

const mockedDelete = jest.fn();
jest.mock("~/hooks/dashboard/useDeleteRegistration", () => ({
  useDeleteRegistration: () => ({
    mutate: mockedDelete,
    isSuccess: true,
  }),
}));

const mockedMutate = jest.fn();
jest.mock("~/hooks/dashboard/useUpdateRegistrationStatus", () => ({
  useUpdateRegistrationStatus: () => ({
    mutate: mockedMutate,
    isSuccess: true,
  }),
}));

const setup = () => render(<DashboardPage />);

describe("Dashboard page", () => {
  it("loads page with mocked data", () => {
    setup();

    expect(screen.getByText("luiz@caju.com.br")).toBeVisible();
    expect(screen.getByText("filipe@caju.com.br")).toBeVisible();
    expect(screen.getByText("jose@caju.com.br")).toBeVisible();

    screen.debug(undefined, Infinity);
  });

  it("approves an admission", async () => {
    setup();

    fireEvent.click(screen.getByText("Aprovar"));
    expect(
      screen.getByText(
        "Você realmente deseja aprovar a admissão do usuário Luiz Filho?"
      )
    ).toBeVisible();

    fireEvent.click(screen.getByText("Confirmar"));
    expect(mockedMutate).toHaveBeenCalledWith({
      body: registrationsResponseMock[0],
      status: RegistrationStatusEnum.Approved,
    });

    await screen.findByText("Admissão atualizada com sucesso!");
  });

  it("deletes an admission", () => {
    setup();

    fireEvent.click(screen.getAllByTestId("delete-admission")[0]);
    expect(
      screen.getByText(
        "Você realmente deseja excluir a admissão do usuário Luiz Filho?"
      )
    ).toBeVisible();

    fireEvent.click(screen.getByText("Confirmar"));
    expect(mockedDelete).toHaveBeenCalledWith("3");
  });
});
