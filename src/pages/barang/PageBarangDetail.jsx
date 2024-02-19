import {useLocation, useNavigate} from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import {useEffect, useState} from "react";
import useValidator from "../../libs/hooks/useValidator.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import WidgetCommonTitleAction from "../../widgets/commons/WidgetCommonTitleAction.jsx";
import WidgetCommonValidator from "../../widgets/commons/WidgetCommonValidator.jsx";
import WidgetCommonRow from "../../widgets/commons/WidgetCommonRow.jsx";
import WidgetCommonLoadingButton from "../../widgets/commons/WidgetCommonLoadingButton.jsx";

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

const PageBarangDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const onChangeListener = useChangeListener();

  const [barang, setBarang] = useState(barangInit);
  const barangValidator = useValidator(barangValidatorInit);

  const onBarangDetail = () => {
    const url = `${BASE_URL}/barang/${state.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        setBarang(response.data);
      })
      .catch((error) => {
        message.error(error);
        navigate(-1)
      })
  }

  const onBarangUpdate = () => {
    barangValidator.reset();
    const url = `${BASE_URL}/barang/${barang.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.put(url, barang, config)
      .then((response) => {
        message.success(response);
        navigate(-1)
      })
      .catch((error) => {
        message.error(error);
        barangValidator.except(error);
      })
  }

  const onBarangDelete = () => {
    message.confirmRemove(() => {
      const url = `${BASE_URL}/barang/${barang.id}/`;
      const config = {
        headers: {
          Authorization: jwt.get()
        }
      }

      http.privateHTTP.delete(url, config)
        .then((response) => {
          message.success(response);
          navigate(-1)
        })
        .catch((error) => {
          message.error(error);
        })
    })
  }

  useEffect(() => {
    if (state.id) {
      onBarangDetail();
    }
  }, [state]);

  return (
    <>
      <Container className={"mt-4 mb-4"}>
        <WidgetCommonTitleAction title={"Update Barang"} action={null} />
        <WidgetCommonRow>
          <Col>
            <Form.Group>
              <Form.Label>Nomor</Form.Label>
              <Form.Control
                name={'nomor'}
                value={barang.nomor}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
              />
              <WidgetCommonValidator messages={barangValidator.get('nomor')} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Nama</Form.Label>
              <Form.Control
                name={'nama'}
                value={barang.nama}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
              />
              <WidgetCommonValidator messages={barangValidator.get('nama')} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Jenis</Form.Label>
              <Form.Control
                name={'jenis'}
                value={barang.jenis}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
              />
              <WidgetCommonValidator messages={barangValidator.get('jenis')} />
            </Form.Group>
          </Col>
        </WidgetCommonRow>
        <WidgetCommonRow>
          <Col>
            <Form.Group>
              <Form.Label>Satuan</Form.Label>
              <Form.Control
                name={'satuan'}
                value={barang.satuan}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
              />
              <WidgetCommonValidator messages={barangValidator.get('satuan')} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Harga Beli</Form.Label>
              <Form.Control
                name={'harga_beli'}
                value={barang.harga_beli}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
                type={"number"}
              />
              <WidgetCommonValidator messages={barangValidator.get('harga_beli')} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Harga Jual</Form.Label>
              <Form.Control
                name={'harga_jual'}
                value={barang.harga_jual}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
                type={"number"}
              />
              <WidgetCommonValidator messages={barangValidator.get('harga_jual')} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Stok</Form.Label>
              <Form.Control
                name={'stok'}
                value={barang.stok}
                onChange={(e) => onChangeListener.onChangeText(e, barang, setBarang)}
                type={"number"}
              />
              <WidgetCommonValidator messages={barangValidator.get('stok')} />
            </Form.Group>
          </Col>
        </WidgetCommonRow>
        <WidgetCommonRow>
          <Col className={"d-flex justify-content-end gap-3"}>
            <WidgetCommonLoadingButton variant={"secondary"}>
              <Button onClick={() => navigate(-1)} variant={'secondary'}>Keluar</Button>
            </WidgetCommonLoadingButton>
            <WidgetCommonLoadingButton variant={"danger"}>
              <Button onClick={onBarangDelete} variant={'danger'}>Hapus</Button>
            </WidgetCommonLoadingButton>
            <WidgetCommonLoadingButton variant={"primary"}>
              <Button onClick={onBarangUpdate}>Simpan</Button>
            </WidgetCommonLoadingButton>
          </Col>
        </WidgetCommonRow>
      </Container>
    </>
  )

}

export default PageBarangDetail;