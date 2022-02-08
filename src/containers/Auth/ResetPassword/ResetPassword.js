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
import "./ResetPassword.css";

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

const ResetPassword = () => {
  const { openModal } = useContext(ModalContext);
  const { t } = useTranslation("auth", { useSuspense: false });
  const { resetPasswordFormSchema, defaultValues } = getFormSchema(t);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(resetPasswordFormSchema),
  });

  const openLoginModalHandler = () => {
    openModal(VIEWS.AUTH_LOGIN);
  };

  const onSubmit = async data => {};

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="name"
            type="text"
            label={t("label_email_input")}
            error={errors?.email?.message}
            register={register}
          />

          <Button
            htmlType="submit"
            shape="round"
            text={t("label_submit_reset-password")}
            type="primary"
            loadingText={t("label_submit_reset-password_loading")}
            block
            onClick={() => {}}
          />
        </form>
      </div>
      <DividerForm size="large" />
      <div className="reset-password-form__footer">
        <p>{t("text_reset-password_login_description")}</p>
        <span onClick={openLoginModalHandler}>{t("text_login_link")}</span>
      </div>
    </div>
  );
};

export default ResetPassword;
