import { fireEvent, screen } from "@testing-library/react";
import DashboardPage from ".";
import { render } from "~/utils/render";

const mockedMutate = jest.fn();
jest.mock("~/hooks/newUser/useCreateNewUser", () => ({
  useCreateNewUser: () => ({
    mutate: mockedMutate,
    isSuccess: true,
  }),
}));

const setup = () => render(<DashboardPage />);

describe("NewUser page", () => {
  it("creates a new user", async () => {
    setup();

    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: { value: "Input mock" },
    });
    fireEvent.change(screen.getAllByRole("textbox", {})[1], {
      target: { value: "teste@mock.com.br" },
    });
    fireEvent.change(screen.getAllByRole("textbox")[2], {
      target: { value: "645.201.680-66" },
    });
    fireEvent.change(screen.getByTestId(/admissionDate/i), {
      target: { value: "2023-10-22" },
    });

    fireEvent.click(screen.getByText("Cadastrar"));
    await screen.findByText("Usuário adicionado com sucesso!");
  });

  it("shows error fields", async () => {
    setup();

    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: { value: "Input" },
    });
    fireEvent.change(screen.getAllByRole("textbox", {})[1], {
      target: { value: "teste@mock" },
    });
    fireEvent.change(screen.getAllByRole("textbox")[2], {
      target: { value: "645.201.680" },
    });

    fireEvent.click(screen.getByText("Cadastrar"));

    await screen.findByText("Insira seu nome completo");
    await screen.findByText("Formato de e-mail incorreto");
    await screen.findByText("CPF inválido");
  });
});
