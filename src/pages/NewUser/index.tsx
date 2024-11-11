import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewUserDTO, newUserSchema } from "~/schemas/newUserSchema";
import { useCreateNewUser } from "~/hooks/newUser/useCreateNewUser";
import { RegistrationStatusEnum } from "~/types/registrations";
import { useEffect } from "react";
import { toast } from "react-toastify";

const NewUserPage = () => {
  const history = useHistory();
  const { mutate, isSuccess, isPending } = useCreateNewUser();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const { handleSubmit, control } = useForm<NewUserDTO>({
    mode: "onChange",
    resolver: zodResolver(newUserSchema),
  });

  const onSubmit = (data: NewUserDTO) => {
    mutate({ ...data, status: RegistrationStatusEnum.Review });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Usuário adicionado com sucesso!");
      goToHome();
    }
  }, [isSuccess]);

  return (
    <S.Container>
      <S.Card>
        <IconButton
          onClick={goToHome}
          aria-label="Voltar para a página inicial"
        >
          <HiOutlineArrowLeft size={24} />
        </IconButton>

        <Controller
          name="employeeName"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              id="employeeName"
              placeholder="Nome"
              label="Nome"
              error={error?.message}
              aria-label="Nome"
              aria-invalid={error ? "true" : "false"}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              id="email"
              placeholder="Email"
              label="Email"
              type="email"
              aria-label="Email"
              error={error?.message}
              aria-invalid={error ? "true" : "false"}
              {...field}
            />
          )}
        />

        <Controller
          name="cpf"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              id="cpf"
              placeholder="CPF"
              label="CPF"
              mask="___.___.___-__"
              replacement={{ _: /\d/ }}
              error={error?.message}
              aria-label="CPF"
              aria-invalid={error ? "true" : "false"}
              {...field}
            />
          )}
        />

        <Controller
          name="admissionDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              id="admissionDate"
              data-testid="admissionDate"
              label="Data de admissão"
              type="date"
              aria-label="Data de admissão"
              error={error?.message}
              aria-invalid={error ? "true" : "false"}
              {...field}
            />
          )}
        />

        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
          aria-label="Cadastrar admissão"
          aria-disabled={isPending ? "true" : "false"}
        >
          Cadastrar
        </Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
