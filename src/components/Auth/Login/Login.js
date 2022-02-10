import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Logo from "../../Logo/Logo";
import DividerForm from "../../UI/DividerForm/DividerForm";
import Alert from "../../Alert/Alert";
import { useTranslation } from "react-i18next";
import "./Login.css";

const LoginComponent = ({
  formHook,
  mutation,
  errorsMutation,
  onSubmit,
  onOpenRegister,
  onOpenForgotPassword,
}) => {
  const { t } = useTranslation("auth", { useSuspense: false });

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

      <div className="login-form__content">
        {mutation.isError &&
          Array.isArray(errorsMutation) &&
          errorsMutation.map((error, index) => (
            <Alert
              key={index}
              title={error.title}
              description={error.detail}
              type="error"
              onClick={mutation.reset}
              closeable
            />
          ))}
        <form onSubmit={formHook.handleSubmit(onSubmit)}>
          <Input
            id="email"
            type="text"
            label={t("label_email_input")}
            error={formHook?.formState?.errors?.email?.message}
            register={formHook.register}
          />

          <Input.Password
            id="password"
            type="password"
            label={t("label_password_input")}
            onClickPasswordReset={onOpenForgotPassword}
            labelLinkText={t("text_forgot_password_link")}
            error={formHook?.formState?.errors?.password?.message}
            register={formHook.register}
          />

          <Button
            htmlType="submit"
            shape="round"
            text={t("label_submit_login")}
            type="primary"
            loadingText={t("label_submit_login_loading")}
            loading={mutation.isLoading}
            block
            onClick={() => {}}
          />
        </form>
      </div>
      <DividerForm size="large" />
      <div className="login-form__footer">
        <p>{t("text_register_description")}</p>
        <span onClick={onOpenRegister}>{t("text_register_link")}</span>
      </div>
    </div>
  );
};

export default LoginComponent;
