import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ModalContext, VIEWS } from "../../../contexts/Modal";
import ActivationAccountComponent from "../../../components/Auth/ActivationAccount/ActivationAccount";
import { useActivateAccountMutation } from "../../../hooks/queries/authQueries";

const ActivationAccountContainer = () => {
  const { openModal } = useContext(ModalContext);
  const searchParams = useSearchParams()[0];
  const [errorsMutation, setErrorsMutation] = useState(null);
  const mutation = useActivateAccountMutation();

  const openLoginModalHandler = () => {
    openModal(VIEWS.AUTH_LOGIN);
  };

  useEffect(() => {
    const input = {
      confirmationCode: searchParams.get("confirmationCode"),
      userId: searchParams.get("userId"),
    };

    mutation.mutate(input, {
      onError: error => {
        setErrorsMutation(error.response.data.errors);
      },
    });
  }, []);

  return (
    <ActivationAccountComponent
      mutation={mutation}
      errorsMutation={errorsMutation}
      onOpenLogin={openLoginModalHandler}
    />
  );
};

export default ActivationAccountContainer;
