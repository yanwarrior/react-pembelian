import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import WidgetCommonTitleAction from "../../widgets/commons/WidgetCommonTitleAction.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {useEffect, useState} from "react";
import useValidator from "../../libs/hooks/useValidator.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import WidgetCommonValidator from "../../widgets/commons/WidgetCommonValidator.jsx";

const barangInit = {
  id: "",
  nomor: "",
  nama: "",
  jenis: "",
  satuan: "",
  harga_beli: 0,
  harga_jual: 0,
  stok: 0,
}

const barangValidatorInit = {
  nomor: [],
  nama: [],
  jenis: [],
  satuan: [],
  harga_beli: [],
  harga_jual: [],
  stok: [],
}

const PageBarangCreate = () => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const onChangeListener = useChangeListener();

  const [barang, setBarang] = useState(barangInit);
  const barangValidator = useValidator(barangValidatorInit);

  const onBarangCreate = () => {
    barangValidator.reset();
    const url = `${BASE_URL}/barang/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.post(url, barang, config)
      .then((response) => {
        message.success(response);
        navigate(-1)
      })
      .catch((error) => {
        message.error(error);
        barangValidator.except(error);
      })
  }

  return (
    <>
      <Container className={"mt-4 mt-4 w-50"}>
        <WidgetCommonTitleAction title={"Buat Barang"} action={null} />
        <Row className={"mb-3"}>
          <Col md={5}>
            <FloatingLabel label={"Nomor"}>
              <Form.Control
                name={'nomor'}
                value={barang.nomor}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
              />
              <WidgetCommonValidator messages={barangValidator.get('nomor')} />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className={"mb-3"}>
          <Col>
            <FloatingLabel label={"Nama"}>
              <Form.Control
                name={'nama'}
                value={barang.nama}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
              />
              <WidgetCommonValidator messages={barangValidator.get('nama')} />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className={"mb-3"}>
          <Col >
            <FloatingLabel label={"Jenis"}>
              <Form.Control
                name={'jenis'}
                value={barang.jenis}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
              />
              <WidgetCommonValidator messages={barangValidator.get('jenis')} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label={"Satuan"}>
              <Form.Control
                name={'satuan'}
                value={barang.satuan}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
              />
              <WidgetCommonValidator messages={barangValidator.get('satuan')} />
            </FloatingLabel>
          </Col>
        </Row>

        <Row className={"mb-3"}>
          <Col >
            <FloatingLabel label={"Harga Jual"}>
              <Form.Control
                name={'harga_jual'}
                value={barang.harga_jual}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
                type={"number"}
              />
              <WidgetCommonValidator messages={barangValidator.get('harga_jual')} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label={"Harga Beli"}>
              <Form.Control
                name={'harga_beli'}
                value={barang.harga_beli}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
                type={"number"}
              />
              <WidgetCommonValidator messages={barangValidator.get('harga_beli')} />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label={"Stok"}>
              <Form.Control
                name={'stok'}
                value={barang.stok}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
                type={"number"}
              />
              <WidgetCommonValidator messages={barangValidator.get('stok')} />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col className={"d-flex justify-content-end gap-3"}>
            <Button onClick={() => navigate(-1)} variant={'outline-secondary'}>Batal</Button>
            <Button onClick={onBarangCreate}>Simpan</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageBarangCreate;