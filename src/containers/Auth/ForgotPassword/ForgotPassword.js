import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalContext, VIEWS } from "../../../contexts/Modal";
import ForgotPasswordComponent from "../../../components/Auth/ForgotPassword/ForgotPassword";
import { useForgotPasswordMutation } from "../../../hooks/queries/authQueries";

const getFormSchema = t => {
  const resetPasswordFormSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("text_validation_format_email_input"))
      .required(t("text_validation_required_email_input")),
  });

  const defaultValues = {
    email: "",
  };

  return { resetPasswordFormSchema, defaultValues };
};

const ForgotPasswordContainer = () => {
  const { openModal } = useContext(ModalContext);
  const [errorsMutation, setErrorsMutation] = useState(null);
  const { t } = useTranslation("auth", { useSuspense: false });
  const { resetPasswordFormSchema, defaultValues } = getFormSchema(t);
  const mutation = useForgotPasswordMutation();

  const formHook = useForm({
    defaultValues,
    resolver: yupResolver(resetPasswordFormSchema),
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
    <ForgotPasswordComponent
      formHook={formHook}
      mutation={mutation}
      errorsMutation={errorsMutation}
      mutation={mutation}
      onSubmit={onSubmit}
      onOpenLogin={openLoginModalHandler}
    />
  );
};

export default ForgotPasswordContainer;
