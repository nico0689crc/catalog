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
import "./Register.css";

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

const Register = () => {
  const { openModal } = useContext(ModalContext);
  const { t } = useTranslation("auth", { useSuspense: false });
  const { registerFormSchema, defaultValues } = getFormSchema(t);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(registerFormSchema),
  });

  const openLoginModalHandler = () => {
    openModal(VIEWS.AUTH_LOGIN);
  };

  const onSubmit = async data => {};

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
      <DividerForm size="large" />
      <div className="register-form__content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            type="text"
            label={t("label_name_input")}
            error={errors?.email?.message}
            register={register}
          />
          <Input
            id="name"
            type="text"
            label={t("label_email_input")}
            error={errors?.email?.message}
            register={register}
          />

          <Input.Password
            id="password"
            type="password"
            label={t("label_password_input")}
            error={errors?.password?.message}
            register={register}
          />

          <Button
            htmlType="submit"
            shape="round"
            text={t("label_submit_register")}
            type="primary"
            loadingText={t("label_submit_register_loading")}
            block
            onClick={() => {}}
          />
        </form>
      </div>
      <DividerForm size="large" />
      <div className="register-form__footer">
        <p>{t("text_login_description")}</p>
        <span onClick={openLoginModalHandler}>{t("text_login_link")}</span>
      </div>
    </div>
  );
};

export default Register;
