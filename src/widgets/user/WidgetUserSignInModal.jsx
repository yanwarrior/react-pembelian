
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import WidgetCommonValidator from "../commons/WidgetCommonValidator.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import {useContext, useState} from "react";
import {ContextApplication} from "../../libs/config/contexts.js";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import useValidator from "../../libs/hooks/useValidator.jsx";

const userInit = {
  username: "",
  password: ""
}

const userValidatorInit = {
  username: [],
  password: []
}

const WidgetUserSignInModal = () => {
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


  return (
    <>
      <Modal
        show={!application.isAuthenticated}
        onHide={handleClose}
        centered={true}
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className={"mb-3"}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name={"username"}
              value={user.username}
              onChange={e => changeListener.onChangeText(e, user, setUser)}
            />
            <WidgetCommonValidator messages={userValidator.get('username')} />
          </Form.Group>
          <Form.Group className={"mb-3"}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name={"password"}
              type={"password"}
              value={user.password}
              onChange={e => changeListener.onChangeText(e, user, setUser)}
            />
            <WidgetCommonValidator messages={userValidator.get('password')} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={signIn}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}

export default WidgetUserSignInModal