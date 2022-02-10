import Logo from "../../Logo/Logo";
import DividerForm from "../../UI/DividerForm/DividerForm";
import Alert from "../../Alert/Alert";
import { useTranslation } from "react-i18next";
import "./ActivationAccount.css";
import Loader from "../../Loader/Loader";

const ActivationAccountComponent = ({
  onOpenLogin,
  errorsMutation,
  mutation,
}) => {
  const { t } = useTranslation("auth", { useSuspense: false });

  return (
    <div className="activation-account-form__container">
      <div className="activation-account-form__header">
        <div className="activation-account-form__logo">
          <Logo />
        </div>
      </div>

      <div className="activation-account-form__content">
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
            title={t("text_activation_account_success_title")}
            description={t("text_activation_account_success_description")}
            type="success"
          />
        )}
        {(mutation.isIdle || mutation.isLoading) && (
          <Loader fill="#00a07f" width="100px" />
        )}
      </div>
      {mutation.isSuccess && (
        <div className="activation-account-form__footer">
          <span onClick={onOpenLogin}>{t("text_login_link")}</span>
        </div>
      )}
    </div>
  );
};

export default ActivationAccountComponent;
