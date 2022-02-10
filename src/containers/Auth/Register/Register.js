import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../../hooks/queries/authQueries";
import { ModalContext, VIEWS } from "../../../contexts/Modal";
import RegisterComponent from "../../../components/Auth/Register/Register";

const getFormSchema = t => {
  const registerFormSchema = yup.object().shape({
    name: yup
      .string()
      .required(t("text_validation_required_name_input"))
      .min(6, t("min_length_6")),
    email: yup
      .string()
      .email(t("text_validation_format_email_input"))
      .required(t("text_validation_required_email_input")),
    password: yup
      .string()
      .required(t("text_validation_required_password_input"))
      .min(6, t("min_length_6"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        t("text_validation_format_password_input")
      ),
  });

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  return { registerFormSchema, defaultValues };
};

const RegisterContainer = () => {
  const { openModal } = useContext(ModalContext);
  const [errorsMutation, setErrorsMutation] = useState(null);
  const { t } = useTranslation("auth", { useSuspense: false });
  const { registerFormSchema, defaultValues } = getFormSchema(t);
  const mutation = useRegisterMutation();

  const formHook = useForm({
    defaultValues,
    resolver: yupResolver(registerFormSchema),
  });

  const openLoginModalHandler = () => {
    openModal(VIEWS.AUTH_LOGIN);
  };

  const onSubmit = async data => {
    const input = {
      ...data,
      redirectionUrl: process.env.REACT_APP_FRONTEND_URL + "/",
    };

    mutation.mutate(input, {
      onError: error => {
        setErrorsMutation(error.response.data.errors);
      },
    });
  };

  return (
    <RegisterComponent
      formHook={formHook}
      mutation={mutation}
      errorsMutation={errorsMutation}
      mutation={mutation}
      onSubmit={onSubmit}
      onOpenLogin={openLoginModalHandler}
    />
  );
};

export default RegisterContainer;
