import {useLocation, useNavigate} from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import {useEffect, useState} from "react";
import useValidator from "../../libs/hooks/useValidator.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import WidgetCommonTitleAction from "../../widgets/commons/WidgetCommonTitleAction.jsx";
import WidgetCommonValidator from "../../widgets/commons/WidgetCommonValidator.jsx";

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

const PageSupplierDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation()

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const onChangeListener = useChangeListener();

  const [supplier, setSupplier] = useState(supplierInit);
  const supplierValidator = useValidator(supplierValidatorInit);

  const onSupplierUpdate = () => {
    supplierValidator.reset();
    const url = `${BASE_URL}/supplier/${supplier.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.put(url, supplier, config)
      .then((response) => {
        message.success(response);
        navigate(-1);
      })
      .catch((error) => {
        message.error(error);
        supplierValidator.except(error);
      })
  }

  const onSupplierDetail = () => {
    const url = `${BASE_URL}/supplier/${state.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        setSupplier(response.data);
      })
      .catch((error) => {
        message.error(error);
        navigate(-1)
      })
  }

  const onSupplierDelete = () => {
    message.confirmRemove(() => {
      const url = `${BASE_URL}/supplier/${state.id}/`;
      const config = {
        headers: {
          Authorization: jwt.get()
        }
      }

      http.privateHTTP.delete(url, config)
        .then((response) => {
          message.success(response)
          navigate(-1)
        })
        .catch((error) => {
          message.error(error);
        })
    })
  }

  useEffect(() => {
    if (state.id) {
      onSupplierDetail();
    }
  }, [state]);

  return (
    <>
      <Container className={"mb-4 mt-4 w-50"}>
        <WidgetCommonTitleAction title={"Buat Supplier"} action={null} />
        <Row className={"mb-3"}>
          <Col md={5}>
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
        </Row>

        <Row className={"mb-3"}>
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
        </Row>

        <Row className={"mb-3"}>
          <Col md={3}>
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
        </Row>

        <Row>
          <Col className={"d-flex justify-content-end gap-3"}>
            <Button onClick={() => navigate(-1)} variant={'outline-secondary'}>Batal</Button>
            <Button onClick={onSupplierDelete} variant={'outline-secondary'}>Hapus</Button>
            <Button onClick={onSupplierUpdate}>Simpan</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageSupplierDetail