import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import Logo from "../../../components/Logo/Logo";
import DividerForm from "../../../components/UI/DividerForm/DividerForm";
import { useContext } from "react";
import { ModalContext, VIEWS } from "../../../contexts/Modal";
import "./Login.css";

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

const Login = () => {
  const { openModal } = useContext(ModalContext);
  const { t } = useTranslation("auth", { useSuspense: false });
  const { loginFormSchema, defaultValues } = getFormSchema(t);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const openRegisterModalHandler = () => {
    openModal(VIEWS.AUTH_REGISTER);
  };

  const openResetPasswordModalHandler = () => {
    openModal(VIEWS.AUTH_RESET_PASSWORD);
  };

  const onSubmit = async data => {};

  return (
    <div className="login-form__container">
      <div className="login-form__header">
        <div className="login-form__logo">
          <Logo />
        </div>
        <p className="login-form__form-description">
          {t("text_login_form_description")}
        </p>
      </div>
      <DividerForm size="large" />
      <div className="login-form__content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            type="text"
            label={t("label_email_input")}
            error={errors?.email?.message}
            register={register}
          />

          <Input.Password
            id="password"
            type="password"
            label={t("label_password_input")}
            onClickPasswordReset={openResetPasswordModalHandler}
            labelLinkText={t("text_forgot_password_link")}
            error={errors?.password?.message}
            register={register}
          />

          <Button
            htmlType="submit"
            shape="round"
            text={t("label_submit_login")}
            type="primary"
            loadingText={t("label_submit_login_loading")}
            block
            onClick={() => {}}
          />
        </form>
      </div>
      <DividerForm size="large" />
      <div className="login-form__footer">
        <p>{t("text_register_description")}</p>
        <span onClick={openRegisterModalHandler}>
          {t("text_register_link")}
        </span>
      </div>
    </div>
  );
};

export default Login;
