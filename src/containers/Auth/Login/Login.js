import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalContext, VIEWS } from "../../../contexts/Modal";
import { AuthContext } from "../../../contexts/AuthContext";
import { useLoginMutation } from "../../../hooks/queries/authQueries";
import * as yup from "yup";
import LoginComponent from "../../../components/Auth/Login/Login";

const getFormSchema = t => {
  const loginFormSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("text_validation_format_email_input"))
      .required(t("text_validation_required_email_input")),
    password: yup
      .string()
      .required(t("text_validation_required_password_input")),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  return { loginFormSchema, defaultValues };
};

const LoginContainer = () => {
  const { t } = useTranslation("auth", { useSuspense: false });
  const [errorsMutation, setErrorsMutation] = useState(null);
  const { openModal, closeModal } = useContext(ModalContext);
  const { login } = useContext(AuthContext);
  const mutation = useLoginMutation();
  const { loginFormSchema, defaultValues } = getFormSchema(t);

  const formHook = useForm({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const openRegisterModalHandler = () => {
    openModal(VIEWS.AUTH_REGISTER);
  };

  const openResetPasswordModalHandler = () => {
    openModal(VIEWS.AUTH_FORGOT_PASSWORD);
  };

  const onSubmit = async data => {
    mutation.mutate(data, {
      onError: error => {
        setErrorsMutation(error.response.data.errors);
      },
      onSuccess: res => {
        const { id, attributes } = res.data;
        login(id, attributes);
        closeModal();
      },
    });
  };

  return (
    <LoginComponent
      formHook={formHook}
      mutation={mutation}
      errorsMutation={errorsMutation}
      onSubmit={onSubmit}
      onOpenRegister={openRegisterModalHandler}
      onOpenForgotPassword={openResetPasswordModalHandler}
    />
  );
};

export default LoginContainer;
