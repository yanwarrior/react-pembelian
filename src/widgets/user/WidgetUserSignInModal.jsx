import useUserSignIn from "../../hooks/user/useUserSignIn.jsx";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import WidgetCommonValidator from "../commons/WidgetCommonValidator.jsx";

const WidgetUserSignInModal = () => {
  const userSignIn = useUserSignIn();

  return (
    <>
      <Modal
        show={!userSignIn.application.isAuthenticated}
        onHide={userSignIn.handleClose}
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
              value={userSignIn.user.username}
              onChange={e => userSignIn.changeListener.onChangeText(e, userSignIn.user, userSignIn.setUser)}
            />
            <WidgetCommonValidator messages={userSignIn.userValidator.get('username')} />
          </Form.Group>
          <Form.Group className={"mb-3"}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name={"password"}
              type={"password"}
              value={userSignIn.user.password}
              onChange={e => userSignIn.changeListener.onChangeText(e, userSignIn.user, userSignIn.setUser)}
            />
            <WidgetCommonValidator messages={userSignIn.userValidator.get('password')} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={userSignIn.signIn}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}

export default WidgetUserSignInModal