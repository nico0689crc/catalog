import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Logo from "../../Logo/Logo";
import DividerForm from "../../UI/DividerForm/DividerForm";
import Alert from "../../Alert/Alert";
import { useTranslation } from "react-i18next";
import "./ResetPassword.css";

const ResetPasswordComponent = ({
  onOpenLogin,
  errorsMutation,
  formHook,
  onSubmit,
  mutation,
}) => {
  const { t } = useTranslation("auth", { useSuspense: false });

  return (
    <div className="reset-password-form__container">
      <div className="reset-password-form__header">
        <div className="reset-password-form__logo">
          <Logo />
        </div>
        <p className="reset-password-form__form-description">
          {t("text_reset-password_form_description")}
        </p>
      </div>
      <DividerForm size="large" />
      <div className="reset-password-form__content">
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
            title={t("text_reset_pass_success_title")}
            description={t("text_reset_pass_success_description")}
            type="success"
          />
        )}
        {!mutation.isSuccess && (
          <form onSubmit={formHook.handleSubmit(onSubmit)}>
            <Input.Password
              id="password"
              type="password"
              label={t("label_password_input")}
              error={formHook?.formState?.errors?.password?.message}
              register={formHook.register}
            />

            <Button
              htmlType="submit"
              shape="round"
              text={t("label_submit_reset-password")}
              type="primary"
              loadingText={t("label_submit_reset-password_loading")}
              loading={mutation.isLoading}
              block
              onClick={() => {}}
            />
          </form>
        )}
      </div>
      {mutation.isSuccess && (
        <>
          <DividerForm size="large" />
          <div className="reset-password-form__footer">
            <span onClick={onOpenLogin}>{t("text_login_link")}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ResetPasswordComponent;
