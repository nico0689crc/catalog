import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Logo from "../../Logo/Logo";
import DividerForm from "../../UI/DividerForm/DividerForm";
import Alert from "../../Alert/Alert";
import { useTranslation } from "react-i18next";
import "./Register.css";

const RegisterComponent = ({
  onOpenLogin,
  errorsMutation,
  formHook,
  onSubmit,
  mutation,
}) => {
  const { t } = useTranslation("auth", { useSuspense: false });

  return (
    <div className="register-form__container">
      <div className="register-form__header">
        <div className="register-form__logo">
          <Logo />
        </div>
        <p className="register-form__form-description">
          {t("text_register_form_description")}
        </p>
      </div>
      <div className="register-form__content">
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
            title={t("text_register_success_title")}
            description={t("text_register_success_description")}
            type="success"
          />
        )}

        {!mutation.isSuccess && (
          <form onSubmit={formHook.handleSubmit(onSubmit)}>
            <Input
              id="name"
              type="text"
              label={t("label_name_input")}
              error={formHook?.formState?.errors?.name?.message}
              register={formHook.register}
            />
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
              error={formHook?.formState?.errors?.password?.message}
              register={formHook.register}
            />

            <Button
              htmlType="submit"
              shape="round"
              text={t("label_submit_register")}
              type="primary"
              loadingText={t("label_submit_register_loading")}
              block
              loading={mutation.isLoading}
              onClick={() => {}}
            />
          </form>
        )}
      </div>
      <DividerForm size="small" />
      <div className="register-form__footer">
        <p>{t("text_login_description")}</p>
        <span onClick={onOpenLogin}>{t("text_login_link")}</span>
      </div>
    </div>
  );
};

export default RegisterComponent;
