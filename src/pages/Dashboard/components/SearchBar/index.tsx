import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";

type SearchBarProps = {
  refetch: () => void;
  cpf: string;
  setCpf: (cpf: string) => void;
};

export const SearchBar = ({ refetch, cpf, setCpf }: SearchBarProps) => {
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  return (
    <S.Container>
      <TextField
        id="cpf"
        placeholder="Digite um CPF válido"
        maxLength={14}
        value={cpf}
        onChange={(event) => setCpf(event?.target.value)}
        mask="___.___.___-__"
        replacement={{ _: /\d/ }}
        aria-label="Digite um CPF válido"
      />
      <S.Actions>
        <IconButton aria-label="Atualizar página" onClick={refetch}>
          <HiRefresh />
        </IconButton>
        <Button onClick={goToNewAdmissionPage} aria-label="Nova Admissão">
          Nova Admissão
        </Button>
      </S.Actions>
    </S.Container>
  );
};
