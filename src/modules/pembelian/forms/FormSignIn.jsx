import {useContext, useState} from "react";
import {ContextApplication} from "../../../libs/config/contexts.js";
import useHTTP from "../../../libs/hooks/useHTTP.jsx";
import useMessage from "../../../libs/hooks/useMessage.jsx";
import useChangeListener from "../../../libs/hooks/useChangeListener.jsx";
import {USER, USER_VALIDATOR} from "../settings.jsx";
import useValidator from "../../../libs/hooks/useValidator.jsx";
import {BASE_URL} from "../../../libs/config/settings.js";
import useJWT from "../../../libs/hooks/useJWT.jsx";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import PrimeWidgetValidationMessage from "../../primes/widgets/PrimeWidgetValidationMessage.jsx";
import {Password} from "primereact/password";
import {Button} from "primereact/button";

const FormSignIn = () => {
  const application = useContext(ContextApplication);
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();
  const changeListener = useChangeListener();

  const [user, setUser] = useState(USER);
  const userValidator = useValidator(USER_VALIDATOR);

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

  return (
    <>
    <Dialog
      header={"Sign In"}
      visible={!application.isAuthenticated}
      onHide={() => {}}
    >
      {JSON.stringify(user)}
      <div className="formgrid grid flex flex-column">
        <div className="field col">
          <label>Username</label>
          <InputText
            value={user.username}
            className={`w-full ${userValidator.primeInvalidField('username')}`}
            onChange={(e) => changeListener.changeText('username', e.target.value, user, setUser)}
          />
          <PrimeWidgetValidationMessage messages={userValidator.get('username')}/>
        </div>
        <div className="field col">
          <label>Password</label>
          <Password
            value={user.password}
            className={`w-full ${userValidator.primeInvalidField('password')}`}
            onChange={(e) => changeListener.changeText('password', e.target.value, user, setUser)}
          />
          <PrimeWidgetValidationMessage messages={userValidator.get('password')}/>
        </div>
      </div>
      <div className="grid">
        <div className="col">
          <Button onClick={signIn}>Sign In</Button>
        </div>
      </div>
    </Dialog>
</>
)
}

export default FormSignIn;