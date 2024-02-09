import {Badge, Button, Card, CloseButton, Col, Form, InputGroup, Nav, Row, Table} from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";
import WidgetCommonValidator from "../commons/WidgetCommonValidator.jsx";
import PropTypes from "prop-types";
import {AiOutlineDelete} from "react-icons/ai";

const WidgetItemDetail = ({ item, onItemUpdate, onItemDelete, onChangeListener, setItem, itemValidator, itemInit}) => {

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className={"d-flex justify-content-between align-items-end gap-3"}>
            <div className={"gap-2 d-flex"}>
              <Badge>{item.nomor_barang}</Badge>
              <Badge>{item.nama_barang}</Badge>
            </div>
            <div className={"d-flex gap-2"}>
              <Nav.Link onClick={onItemDelete}>
                <AiOutlineDelete size={25} />
              </Nav.Link>
              <CloseButton onClick={() => setItem(itemInit)} />
            </div>
          </Card.Title>
          <Form.Group className={"mb-3"}>
            <Form.Label>Harga</Form.Label>
            <InputGroup>
              <InputGroupText>IDR</InputGroupText>
              <Form.Control
                name={'harga'}
                value={item.harga}
                onKeyDown={onItemUpdate}
                onChange={(e) => onChangeListener.onChangeNumber(e, item, setItem)}
              />
            </InputGroup>
            <WidgetCommonValidator messages={itemValidator.get('harga')}/>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group >
                <Form.Label>Dikson</Form.Label>
                <InputGroup >
                  <Form.Control
                    name={'diskon'}
                    value={item.diskon}
                    onKeyDown={onItemUpdate}
                    onChange={(e) => onChangeListener.onChangeNumber(e, item, setItem)}
                  />
                  <InputGroupText>%</InputGroupText>
                </InputGroup>
                <WidgetCommonValidator messages={itemValidator.get('diskon')}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <InputGroup>
                  <Form.Control
                    name={'quantity'}
                    value={item.quantity}
                    onKeyDown={onItemUpdate}
                    onChange={(e) => onChangeListener.onChangeNumber(e, item, setItem)}
                  />
                </InputGroup>
                <WidgetCommonValidator messages={itemValidator.get('quantity')}/>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

WidgetItemDetail.propTypes = {
  item: PropTypes.object,
  onItemUpdate: PropTypes.func,
  onChangeListener: PropTypes.func,
  setItem: PropTypes.func,
  itemValidator: PropTypes.object,
  itemInit: PropTypes.object,
  onItemDelete: PropTypes.func
}

export default WidgetItemDetail;