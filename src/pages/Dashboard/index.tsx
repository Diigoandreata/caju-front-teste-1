import DashboardColumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/SearchBar";
import { useGetRegistrations } from "~/hooks/dashboard/useGetRegistrations";
import { useState } from "react";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import { removeMask } from "~/utils/masks";

const DashboardPage = () => {
  const [cpf, setCpf] = useState("");
  const { data, refetch, isLoading, isFetching } = useGetRegistrations({
    cpf: isValidCPF(cpf) ? removeMask(cpf) : "",
  });

  const loading = isLoading || isFetching;

  return (
    <S.Container>
      <SearchBar refetch={refetch} cpf={cpf} setCpf={setCpf} />
      <DashboardColumns registrations={data} isLoading={loading} />
    </S.Container>
  );
};
export default DashboardPage;
