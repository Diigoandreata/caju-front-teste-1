import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import {
  RegistrationResponse,
  RegistrationStatusEnum,
} from "~/types/registrations";
import { useUpdateRegistrationStatus } from "~/hooks/dashboard/useUpdateRegistrationStatus";
import { useDeleteRegistration } from "~/hooks/dashboard/useDeleteRegistration";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { RegistrationCardSkeleton } from "~/pages/Dashboard/components/RegistrationCard/registrationCardSkeleton";

const allColumns = [
  { status: RegistrationStatusEnum.Review, title: "Pronto para revisar" },
  { status: RegistrationStatusEnum.Approved, title: "Aprovado" },
  { status: RegistrationStatusEnum.Reproved, title: "Reprovado" },
];

type DashboardColumnsProps = {
  registrations?: RegistrationResponse[];
  isLoading?: boolean;
};

const DashboardColumns = ({
  registrations,
  isLoading,
}: DashboardColumnsProps) => {
  const {
    mutate: updateRegistration,
    isSuccess: updated,
    isPending: updating,
  } = useUpdateRegistrationStatus();
  const {
    mutate: deleteRegistration,
    isSuccess: removed,
    isPending: deleting,
  } = useDeleteRegistration();

  const isLoadingAction = updating || deleting;

  useEffect(() => {
    if (updated) {
      toast.success("Admissão atualizada com sucesso!");
    }

    if (removed) {
      toast.success("Admissão removida com sucesso!");
    }
  }, [updated, removed]);

  return (
    <S.Container>
      {allColumns.map((column) => (
        <S.Column status={column.status} key={column.status}>
          <S.TitleColumn status={column.status}>{column.title}</S.TitleColumn>
          <S.ColumnContent>
            {isLoading ? (
              <div role="status" aria-live="polite">
                <RegistrationCardSkeleton />
              </div>
            ) : (
              registrations
                ?.filter(
                  (registration) => registration.status === column.status
                )
                ?.map((registration) => (
                  <RegistrationCard
                    data={registration}
                    key={registration.id}
                    updateRegistration={updateRegistration}
                    deleteRegistration={deleteRegistration}
                    isLoading={isLoadingAction}
                  />
                ))
            )}
          </S.ColumnContent>
        </S.Column>
      ))}
    </S.Container>
  );
};
export default DashboardColumns;
