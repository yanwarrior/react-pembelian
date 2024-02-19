import {useNavigate} from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import {useState} from "react";
import useValidator from "../../libs/hooks/useValidator.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import WidgetCommonTitleAction from "../../widgets/commons/WidgetCommonTitleAction.jsx";
import WidgetCommonValidator from "../../widgets/commons/WidgetCommonValidator.jsx";
import WidgetCommonRow from "../../widgets/commons/WidgetCommonRow.jsx";

const supplierInit = {
  id: "",
  nomor: "",
  nama: "",
  alamat: "",
  telepon: "",
  contact_person: "",
  bank: "",
  rekening: ""
}

const supplierValidatorInit = {
  nomor: [],
  nama: [],
  alamat: [],
  telepon: [],
  contact_person: [],
  bank: [],
  rekening: []
}

const PageSupplierCreate = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const onChangeListener = useChangeListener();

  const [supplier, setSupplier] = useState(supplierInit);
  const supplierValidator = useValidator(supplierValidatorInit);

  const onSupplierCreate = () => {
    supplierValidator.reset();
    const url = `${BASE_URL}/supplier/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.post(url, supplier, config)
      .then((response) => {
        message.success(response);
        navigate(-1);
      })
      .catch((error) => {
        message.error(error);
        supplierValidator.except(error);
      })
  }

  return (
    <>
      <Container className={"mb-4 mt-4"}>
        <WidgetCommonTitleAction title={"Buat Supplier"} action={null} />
        <WidgetCommonRow>
          <Col>
            <Form.Group>
              <Form.Label>Nomor</Form.Label>
              <Form.Control
                name={"nomor"}
                value={supplier.nomor}
                onChange={(e) => onChangeListener.onChangeText(e, supplier, setSupplier)}
              />
              <WidgetCommonValidator messages={supplierValidator.get('nomor')} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Nama</Form.Label>
              <Form.Control
                name={'nama'}
                value={supplier.nama}
                onChange={(e) => onChangeListener.onChangeText(e, supplier, setSupplier)}
              />
              <WidgetCommonValidator messages={supplierValidator.get('nama')} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Telepon</Form.Label>
              <Form.Control
                name={'telepon'}
                value={supplier.telepon}
                onChange={(e) => onChangeListener.onChangeText(e, supplier, setSupplier)}
              />
              <WidgetCommonValidator messages={supplierValidator.get('telepon')} />
            </Form.Group>
          </Col>
        </WidgetCommonRow>
        <WidgetCommonRow>
          <Col>
            <Form.Group>
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                name={'alamat'}
                value={supplier.alamat}
                as={"textarea"}
                rows={3}
                onChange={(e) => onChangeListener.onChangeText(e, supplier, setSupplier)}
              />
              <WidgetCommonValidator messages={supplierValidator.get('alamat')} />
            </Form.Group>
          </Col>
        </WidgetCommonRow>
        <WidgetCommonRow>
          <Col>
            <Form.Group>
              <Form.Label>Bank</Form.Label>
              <Form.Control
                name={'bank'}
                value={supplier.bank}
                onChange={(e) => onChangeListener.onChangeText(e, supplier, setSupplier)}
              />
              <WidgetCommonValidator messages={supplierValidator.get('bank')} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Rekening</Form.Label>
              <Form.Control
                name={'rekening'}
                value={supplier.rekening}
                onChange={(e) => onChangeListener.onChangeText(e, supplier, setSupplier)}
              />
              <WidgetCommonValidator messages={supplierValidator.get('rekening')} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                name={'contact_person'}
                value={supplier.contact_person}
                onChange={(e) => onChangeListener.onChangeText(e, supplier, setSupplier)}
              />
              <WidgetCommonValidator messages={supplierValidator.get('contact_person')} />
            </Form.Group>
          </Col>
        </WidgetCommonRow>

        <WidgetCommonRow>
          <Col className={"d-flex justify-content-end gap-3"}>
            <Button onClick={() => navigate(-1)} variant={'secondary'}>Batal</Button>
            <Button onClick={onSupplierCreate}>Simpan</Button>
          </Col>
        </WidgetCommonRow>
      </Container>
    </>
  )
}

export default PageSupplierCreate