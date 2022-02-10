import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Logo from "../../Logo/Logo";
import DividerForm from "../../UI/DividerForm/DividerForm";
import Alert from "../../Alert/Alert";
import { useTranslation } from "react-i18next";
import "./ForgotPassword.css";

const ForgotPasswordComponent = ({
  onOpenLogin,
  errorsMutation,
  formHook,
  onSubmit,
  mutation,
}) => {
  const { t } = useTranslation("auth", { useSuspense: false });

  return (
    <div className="forgot-password-form__container">
      <div className="forgot-password-form__header">
        <div className="forgot-password-form__logo">
          <Logo />
        </div>
        <p className="forgot-password-form__form-description">
          {t("text_forgot-password_form_description")}
        </p>
      </div>
      <DividerForm size="large" />
      <div className="forgot-password-form__content">
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

        {mutation.isSuccess && (
          <Alert
            title={t("text_forgot_pass_success_title")}
            description={t("text_forgot_pass_success_description")}
            type="success"
          />
        )}
        {!mutation.isSuccess && (
          <form onSubmit={formHook.handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="text"
              label={t("label_email_input")}
              error={formHook?.formState?.errors?.email?.message}
              register={formHook.register}
            />

            <Button
              htmlType="submit"
              shape="round"
              text={t("label_submit_forgot-password")}
              type="primary"
              loadingText={t("label_submit_forgot-password_loading")}
              loading={mutation.isLoading}
              block
              onClick={() => {}}
            />
          </form>
        )}
      </div>
      <DividerForm size="large" />
      <div className="forgot-password-form__footer">
        <p>{t("text_forgot-password_login_description")}</p>
        <span onClick={onOpenLogin}>{t("text_login_link")}</span>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
