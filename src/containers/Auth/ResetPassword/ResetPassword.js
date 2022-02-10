import { useContext, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ModalContext, VIEWS } from "../../../contexts/Modal";
import ResetPasswordComponent from "../../../components/Auth/ResetPassword/ResetPassword";
import { useResetPasswordMutation } from "../../../hooks/queries/authQueries";

const getFormSchema = t => {
  const resetPasswordFormSchema = yup.object().shape({
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
    password: "",
  };

  return { resetPasswordFormSchema, defaultValues };
};

const ResetPasswordContainer = () => {
  const { openModal } = useContext(ModalContext);
  const searchParams = useSearchParams()[0];
  const [errorsMutation, setErrorsMutation] = useState(null);
  const { t } = useTranslation("auth", { useSuspense: false });
  const { resetPasswordFormSchema, defaultValues } = getFormSchema(t);
  const mutation = useResetPasswordMutation();
  const navigate = useNavigate();

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
      token: searchParams.get("token"),
      userId: searchParams.get("userId"),
    };

    mutation.mutate(input, {
      onSuccess: () => {
        navigate("/");
      },
      onError: error => {
        setErrorsMutation(error.response.data.errors);
      },
    });
  };

  return (
    <ResetPasswordComponent
      formHook={formHook}
      mutation={mutation}
      errorsMutation={errorsMutation}
      mutation={mutation}
      onSubmit={onSubmit}
      onOpenLogin={openLoginModalHandler}
    />
  );
};

export default ResetPasswordContainer;
