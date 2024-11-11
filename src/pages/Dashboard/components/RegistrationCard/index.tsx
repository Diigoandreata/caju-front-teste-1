import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import {
  RegistrationResponse,
  RegistrationStatusEnum,
  UpdateRegistrationDTO,
} from "~/types/registrations";
import { Dialog } from "~/components/Dialog";
import { useState } from "react";

type ActionType = RegistrationStatusEnum | "delete";

type RegistrationCardProps = {
  data: RegistrationResponse;
  deleteRegistration: (id: string) => void;
  updateRegistration: (body: UpdateRegistrationDTO) => void;
  isLoading?: boolean;
};

const RegistrationCard = ({
  data,
  deleteRegistration,
  updateRegistration,
  isLoading,
}: RegistrationCardProps) => {
  const [selectAction, setSelectAction] = useState<ActionType | null>(null);

  const ACTION_TITLE = {
    [RegistrationStatusEnum.Reproved]: `Você realmente deseja reprovar a admissão do usuário ${data.employeeName}?`,
    [RegistrationStatusEnum.Approved]: `Você realmente deseja aprovar a admissão do usuário ${data.employeeName}?`,
    [RegistrationStatusEnum.Review]: `Você realmente deseja revisar novamente a admissão do usuário ${data.employeeName}?`,
    delete: `Você realmente deseja excluir a admissão do usuário ${data.employeeName}?`,
  };

  const handleAction = () => {
    if (!selectAction) return;

    if (selectAction === "delete") {
      deleteRegistration(data.id);
      return;
    }

    updateRegistration({ body: data, status: selectAction });
  };

  return (
    <>
      <Dialog
        isOpen={!!selectAction}
        onClose={() => setSelectAction(null)}
        onConfirm={handleAction}
        title={ACTION_TITLE[selectAction as ActionType]}
        isLoading={isLoading}
      />

      <S.Card>
        <S.IconAndText>
          <HiOutlineUser aria-label="Nome" />
          <h3>{data.employeeName}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail aria-label="Email" />
          <p>{data.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar aria-label="Data de admissão" />
          <span>{data.admissionDate}</span>
        </S.IconAndText>

        <S.Actions>
          {data.status === RegistrationStatusEnum.Review ? (
            <S.ReviewActions>
              <ButtonSmall
                onClick={() => setSelectAction(RegistrationStatusEnum.Reproved)}
                bgcolor="rgb(255, 145, 154)"
                aria-label="Reprovar admissão"
              >
                Reprovar
              </ButtonSmall>
              <ButtonSmall
                onClick={() => setSelectAction(RegistrationStatusEnum.Approved)}
                bgcolor="rgb(155, 229, 155)"
                aria-label="Aprovar admissão"
              >
                Aprovar
              </ButtonSmall>
            </S.ReviewActions>
          ) : (
            <ButtonSmall
              onClick={() => setSelectAction(RegistrationStatusEnum.Review)}
              bgcolor="#ff8858"
              aria-label="Revisar novamente admissão"
            >
              Revisar novamente
            </ButtonSmall>
          )}

          <HiOutlineTrash
            onClick={() => setSelectAction("delete")}
            data-testid="delete-admission"
            aria-label="Deletar admissão"
            role="button"
          />
        </S.Actions>
      </S.Card>
    </>
  );
};

export default RegistrationCard;
