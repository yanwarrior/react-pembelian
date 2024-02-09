import {useContext, useState} from "react";
import {ContextApplication} from "../../libs/config/contexts.js";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useValidator from "../../libs/hooks/useValidator.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";

const userInit = {
  username: "",
  password: ""
}

const userValidatorInit = {
  username: [],
  password: []
}

const useUserSignIn = () => {
  const application = useContext(ContextApplication);
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [user, setUser] = useState(userInit);
  const userValidator = useValidator(userValidatorInit);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signIn = () => {
    userValidator.reset();

    const url = `${BASE_URL}/user/signin/`;

    http.publicHTTP.post(url, user)
      .then((response) => {
        jwt.set(response.data.access);
        application.setIsAuthenticated(true);
        message.success(response)
      })
      .catch((error) => {
        message.error(error);
        userValidator.except(error)
      });
  }

  return {
    user,
    setUser,
    signIn,
    userValidator,
    handleShow,
    handleClose,
    show,
    setShow,
    application,
    changeListener
  }
}

export default useUserSignIn;