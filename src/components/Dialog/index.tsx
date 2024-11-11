import Button from "~/components/Buttons";
import {
  DialogActions,
  DialogContent,
  DialogWrapper,
} from "~/components/Dialog/styles";

export type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isLoading?: boolean;
};

export const Dialog = ({
  title,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: DialogProps) => {
  if (!isOpen) return null;

  return (
    <DialogWrapper role="dialog">
      <DialogContent>
        <h2>{title}</h2>
        <DialogActions>
          <Button
            bgcolor="#888888"
            onClick={onClose}
            disabled={isLoading}
            aria-disabled={isLoading ? "true" : "false"}
            aria-label="Cancelar a ação"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            type="button"
            disabled={isLoading}
            aria-disabled={isLoading ? "true" : "false"}
            aria-label="Confirmar a ação"
          >
            Confirmar
          </Button>
        </DialogActions>
      </DialogContent>
    </DialogWrapper>
  );
};
