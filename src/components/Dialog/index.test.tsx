import { fireEvent, render, screen } from "@testing-library/react";
import { Dialog, DialogProps } from "~/components/Dialog";

const close = jest.fn();
const confirm = jest.fn();

const setup = (props: DialogProps) => render(<Dialog {...props} />);

describe("Dialog component", () => {
  it("shows dialog with passed info and click on action buttons", () => {
    setup({
      isOpen: true,
      title: "Test",
      onClose: close,
      onConfirm: confirm,
    });

    expect(screen.getByText("Test")).toBeDefined();

    fireEvent.click(screen.getByText("Confirmar"));
    expect(confirm).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Cancelar"));
    expect(close).toHaveBeenCalled();
  });

  it("hides the dialog when isOpen is false", () => {
    setup({
      isOpen: false,
      title: "Test",
      onClose: close,
      onConfirm: confirm,
    });

    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });
});
