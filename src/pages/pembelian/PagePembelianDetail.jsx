import {useLocation, useNavigate} from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import {useEffect, useRef, useState} from "react";
import useValidator from "../../libs/hooks/useValidator.jsx";
import WidgetCommonTitleAction from "../../widgets/commons/WidgetCommonTitleAction.jsx";
import {Button, Card, Col, Container, Form, InputGroup, Nav, Row, Table} from "react-bootstrap";
import WidgetCommonValidator from "../../widgets/commons/WidgetCommonValidator.jsx";
import WidgetCommonFilter from "../../widgets/commons/WidgetCommonFilter.jsx";
import WidgetCommonPagination from "../../widgets/commons/WidgetCommonPagination.jsx";
import useFormatter from "../../libs/hooks/useFormatter.jsx";

import WidgetSupplierChoice from "../../widgets/supplier/WidgetSupplierChoice.jsx";
import WidgetBarangChoice from "../../widgets/barang/WidgetBarangChoice.jsx";
import {BsCheck2Circle} from "react-icons/bs";
import WidgetCommonLoadingInput from "../../widgets/commons/WidgetCommonLoadingInput.jsx";
import WidgetCommonLoadingTable from "../../widgets/commons/WidgetCommonLoadingTable.jsx";
import WidgetCommonLoadingButton from "../../widgets/commons/WidgetCommonLoadingButton.jsx";
import {pembelianInit, pembelianValidatorInit} from "../../data/pembelian.js";
import {itemInit, itemValidatorInit} from "../../data/item.js";
import {paginationInit} from "../../data/commons.js";
import {pembayaranInit, pembayaranValidatorInit} from "../../data/pembayaran.js";

const PagePembelianDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const formatter = useFormatter()
  const onChangeListener = useChangeListener();

  const [pembelian, setPembelian] = useState(pembelianInit);
  const pembelianValidator = useValidator(pembelianValidatorInit);
  const tanggalref = useRef({value: ""})

  const [daftarItem, setDaftarItem] = useState([]);
  const [item, setItem] = useState(itemInit);
  const itemValidator = useValidator(itemValidatorInit)
  const [itemPaginate, setItemPaginate] = useState(paginationInit);

  const [pembayaran, setPembayaran] = useState(pembayaranInit)
  const pembayaranValidator = useValidator(pembayaranValidatorInit)


  const onPembelianDetail = async () => {
    try {
      const url = `${BASE_URL}/pembelian/${state.id}/`;
      const config = {
        headers: {
          Authorization: jwt.get()
        }
      }
      const { data } = await http.privateHTTP.get(url, config)
      setPembelian(data);
      tanggalref.current.value = data.tanggal;

    } catch (error) {
      console.log(error)
      message.error(error)
    }
  }

  const onPembelianUpdate = (payload) => {
    pembelianValidator.reset();
    const url = `${BASE_URL}/pembelian/${state.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }
    payload = {...pembelian, ...payload}
    http.privateHTTP.put(url, payload, config)
      .then((response) => {
        setPembelian(response.data);
        tanggalref.current.value = response.data.tanggal;
        onPembayaranDetail()
      })
      .catch((error) => {
        pembelianValidator.except(error)
        message.error(error)
      })
  }

  const onPembelianDelete = () => {
    message.confirmRemove(() => {
    const url = `${BASE_URL}/pembelian/${state.id}/`;
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
        message.error(error)
      })
    })
  }

  const onPembelianPublish = () => {
    const url = `${BASE_URL}/pembelian/${state.id}/publish/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.post(url, null, config)
      .then((response) => {
        message.success(response)
        navigate(-1)
      })
      .catch((error) => {
        message.error(error)
      })
  }

  const callbackWidgetSupplierChoice = (value) => {
    if (pembelian.is_draft) {
      onPembelianUpdate({supplier: value.id})
    }
  }

  const onPembelianUpdateTanggal = (e) => {
    onPembelianUpdate({tanggal: e.target.value})
  }

  useEffect(() => {
    if (state.id) {
      onPembelianDetail()
    }
  }, [state.id])

  const onItemList = (url, params) => {
    url = url ? url : `${BASE_URL}/pembelian/${state.id}/items/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      },
      params
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        const {results, ...pagination} = response.data;
        setDaftarItem(results);
        setItemPaginate(pagination);
      })
      .catch((error) => {
        message.error(error)
      })
  }

  const onItemFilter = (params) => {
    onItemList(null, params);
  }

  const onItemPaginate = (url) => {
    onItemList(url)
  }

  const onItemCreate = (payload) => {
    const url = `${BASE_URL}/pembelian/${state.id}/items/`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      }
    }

    http.privateHTTP.post(url, payload, config)
      .then((response) => {
        message.success(response);
        onItemList()
        onPembelianDetail();
        onPembayaranDetail();
      })
      .catch((error) => {
        message.error(error);
      })
  }

  const onItemUpdate = () => {
    const url = `${BASE_URL}/pembelian/${state.id}/items/${item.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.put(url, item, config)
      .then(() => {
        onItemList()
        setItem(itemInit);
        onPembayaranDetail()
      })
      .catch((error) => {
        message.error(error)
        itemValidator.except(error);
      })
  }

  const onItemDelete = () => {
    const url = `${BASE_URL}/pembelian/${state.id}/items/${item.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.delete(url, config)
      .then(() => {
        onItemList()
        setItem(itemInit);
        onPembayaranDetail()
        onPembelianDetail()
      })
      .catch((error) => {
        message.error(error)
      })
  }

  const callbackWidgetBarangChoice = (value) => {
    const payload = {
      barang: value.id,
      diskon: 0,
      harga: value.harga_beli,
      quantity: 1,
    }

    onItemCreate(payload)
  }

  useEffect(() => {
    if (state.id) {
      onItemList()
    }
  }, [state.id])


  const onPembayaranDetail = () => {
    const url = `${BASE_URL}/pembelian/${state.id}/pembayaran/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        setPembayaran(response.data)
      })
      .catch((error) => {
        message.error(error)
      })
  }

  const onPembayaranUpdate = () => {
    pembayaranValidator.reset();
    const url = `${BASE_URL}/pembelian/${state.id}/pembayaran/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.put(url, pembayaran, config)
      .then((response) => {
        setPembayaran(response.data)
        onPembelianDetail()
      })
      .catch((error) => {
        message.error(error)
        pembayaranValidator.except(error);
      })
  }

  useEffect(() => {
    if (state.id) {
      onPembayaranDetail()
    }
  }, [state.id]);

  return (
    <Container className={"mb-4 mt-4"}>
      <WidgetCommonTitleAction title={(
        <>
          Detail Pembelian {" "} <BsCheck2Circle className={"text-success"} />
        </>
      )} />
      <Row className={"mb-3 d-flex flex-column gap-3 flex-lg-row gap-lg-0"}>
        <Col>
          <Form.Group>
            <Form.Label>Nomor (Number ID)</Form.Label>
            <WidgetCommonLoadingInput>
              <InputGroup>
                <Form.Control readOnly={true} disabled={true} value={pembelian.nomor} />
              </InputGroup>
            </WidgetCommonLoadingInput>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Tanggal</Form.Label>
            <WidgetCommonLoadingInput>
              <Form.Control
                type={"date"}
                value={pembelian.tanggal}
                name={"tanggal"}
                onChange={onPembelianUpdateTanggal}
              />
            </WidgetCommonLoadingInput>
            <WidgetCommonValidator messages={pembelianValidator.get('tanggal')} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Supplier *</Form.Label>
              <InputGroup>
                <Form.Control value={pembelian.nama_supplier} readOnly={true} />
                <WidgetSupplierChoice callback={callbackWidgetSupplierChoice} />
              </InputGroup>
            <WidgetCommonValidator messages={pembelianValidator.get('supplier')} />
          </Form.Group>
        </Col>
      </Row>

      <Row className={"mb-3 d-flex flex-column gap-3 flex-lg-row gap-lg-0"}>
        <Col>
          <Form.Group>
            <Form.Label>Metode Pembayaran</Form.Label>
            <WidgetCommonLoadingInput>
              <InputGroup>
                <Form.Control readOnly={true} disabled={true} value={pembelian.metode_pembayaran} />
              </InputGroup>
            </WidgetCommonLoadingInput>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Jumlah Barang</Form.Label>
            <WidgetCommonLoadingInput>
              <Form.Control readOnly={true} disabled={true} value={pembelian.jumlah_barang} />
            </WidgetCommonLoadingInput>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Status Pembayaran</Form.Label>
            <WidgetCommonLoadingInput>
              <Form.Control
                readOnly={true}
                disabled={true}
                value={pembelian.pembayaran_lunas ? "Lunas" : "Belum Lunas"}
              />
            </WidgetCommonLoadingInput>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <WidgetCommonLoadingInput>
              <Form.Control
                readOnly={true}
                disabled={true}
                value={pembelian.is_draft ? "Draft" : "Sudah Terpublikasi"}
              />
            </WidgetCommonLoadingInput>
          </Form.Group>
        </Col>
      </Row>

      <Row className={"mb-3 d-flex flex-column gap-3 flex-lg-row gap-lg-0"}>
        <Col>
          <Card>
            <Card.Body className={"d-flex flex-column gap-3"}>
              <Card.Subtitle>Daftar Item</Card.Subtitle>
              <Row>
                <Col>
                  <WidgetCommonLoadingInput>
                    <WidgetCommonFilter
                      md={12}
                      filterset={[
                        { name: "nomor", label: "Nomor" },
                        { name: "nama", label: "Nama" }
                      ]}
                      callback={onItemFilter}
                    />
                  </WidgetCommonLoadingInput>
                </Col>
                <Col className={"d-flex justify-content-end"}>
                  <WidgetBarangChoice callback={callbackWidgetBarangChoice} />
                </Col>
              </Row>
            </Card.Body>
            <WidgetCommonLoadingTable>
              <Table responsive={true} borderless={true} hover={true}  striped={"columns"}>
                <thead>
                <tr>
                  <th>Nomor</th>
                  <th>Nama</th>
                  <th>Satuan</th>
                  <th>Jenis</th>
                  <th>Harga</th>
                  <th>Diskon</th>
                  <th>Qty</th>
                  <th>Stok</th>
                  <th>Saldo</th>
                  <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {daftarItem.map((value) => (
                  <tr key={value.id} >
                    <td>
                      <Nav.Link className={"text-primary"} onClick={() => setItem(value)}>
                        {value.nomor_barang}
                      </Nav.Link>
                    </td>
                    <td>{value.nama_barang}</td>
                    <td>{value.satuan}</td>
                    <td>{value.jenis}</td>
                    <td>{formatter.formatCurrency(value.harga)}</td>
                    <td>{value.diskon}</td>
                    <td>{value.quantity}</td>
                    <td>{value.stok_barang}</td>
                    <td>{value.saldo}</td>
                    <td>{formatter.formatCurrency(value.total)}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </WidgetCommonLoadingTable>
            <Card.Footer>
              <WidgetCommonLoadingButton variant={"secondary"}>
                <WidgetCommonPagination pagination={itemPaginate} callback={onItemPaginate} />
              </WidgetCommonLoadingButton>
            </Card.Footer>
          </Card>
        </Col>
        {item.id && (
          <Col>
            <Card>
              <Card.Body className={"d-flex flex-column gap-3"}>
                <Card.Subtitle>Ubah Item</Card.Subtitle>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Nomor</Form.Label>
                      <WidgetCommonLoadingInput>
                        <Form.Control value={item.nomor_barang} disabled readOnly />
                      </WidgetCommonLoadingInput>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Nama</Form.Label>
                      <WidgetCommonLoadingInput>
                        <Form.Control value={item.nama_barang} disabled readOnly />
                      </WidgetCommonLoadingInput>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Harga Barang</Form.Label>
                      <WidgetCommonLoadingInput>
                        <Form.Control
                          type={"number"}
                          name={"harga"}
                          value={item.harga}
                          onChange={(e) => onChangeListener.onChangeNumber(e, item, setItem)}
                        />
                      </WidgetCommonLoadingInput>
                      <WidgetCommonValidator messages={itemValidator.get('harga_barang')} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Diskon</Form.Label>
                      <WidgetCommonLoadingInput>
                        <Form.Control
                          type={"number"}
                          name={"diskon"}
                          value={item.diskon}
                          onChange={(e) => onChangeListener.onChangeNumber(e, item, setItem)}
                        />
                      </WidgetCommonLoadingInput>
                      <WidgetCommonValidator messages={itemValidator.get('diskon')} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Qty</Form.Label>
                      <WidgetCommonLoadingInput>
                        <Form.Control
                          type={"number"}
                          name={"quantity"}
                          value={item.quantity}
                          onChange={(e) => onChangeListener.onChangeNumber(e, item, setItem)}
                        />
                      </WidgetCommonLoadingInput>
                      <WidgetCommonValidator messages={itemValidator.get('qty')} />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className={"d-flex gap-2"}>
                <WidgetCommonLoadingButton>
                  <Button onClick={() => setItem(itemInit)} variant={"secondary"}>Tutup</Button>
                  <Button variant={"danger"} onClick={onItemDelete}>Hapus</Button>
                  <Button onClick={() => {
                    onItemUpdate()
                    setItem(itemInit)
                  }}>Ubah</Button>
                </WidgetCommonLoadingButton>
              </Card.Footer>
            </Card>
          </Col>
        )}
      </Row>

      <Row className={"mb-3 d-flex flex-column gap-3 flex-lg-row gap-lg-0 justify-content-lg-end"}>
        <Col lg={5}>
          <Card >
            <Card.Body className={"d-flex flex-column gap-3"}>
              <Card.Subtitle>Pembayaran</Card.Subtitle>
              <Form.Group >
                <Form.Label>Total</Form.Label>
                <WidgetCommonLoadingInput>
                  <Form.Control
                    readOnly={true}
                    disabled={true}
                    value={formatter.formatCurrency(pembayaran.total)}
                  />
                </WidgetCommonLoadingInput>
              </Form.Group>
              <Form.Group className={"w-50"}>
                <Form.Label>PPN* ({pembayaran.ppn /  100}%)</Form.Label>
                <WidgetCommonLoadingInput>
                  <Form.Control
                    type={"number"}
                    name={"ppn"}
                    value={pembayaran.ppn}
                    onKeyDown={(e) => e.key === 'Enter' && onPembayaranUpdate()}
                    onChange={(e) => onChangeListener.onChangeNumber(e, pembayaran, setPembayaran)}
                  />
                </WidgetCommonLoadingInput>
                <WidgetCommonValidator messages={pembayaranValidator.get('ppn')} />
              </Form.Group>
              <Form.Group className={"w-50"}>
                <Form.Label>Diskon* ({pembayaran.diskon / 100}%)</Form.Label>
                <WidgetCommonLoadingInput>
                  <Form.Control
                    type={"number"}
                    name={"diskon"}
                    value={pembayaran.diskon}
                    onKeyDown={(e) => e.key === 'Enter' && onPembayaranUpdate()}
                    onChange={(e) => onChangeListener.onChangeNumber(e, pembayaran, setPembayaran)}
                  />
                </WidgetCommonLoadingInput>
                <WidgetCommonValidator messages={pembayaranValidator.get('diskon')} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Dibayar* ({formatter.formatCurrency(pembayaran.dibayar)})</Form.Label>
                <WidgetCommonLoadingInput>
                  <Form.Control
                    type={"number"}
                    name={"dibayar"}
                    value={pembayaran.dibayar}
                    onKeyDown={(e) => e.key === 'Enter' && onPembayaranUpdate()}
                    onChange={(e) => onChangeListener.onChangeNumber(e, pembayaran, setPembayaran)}
                  />
                </WidgetCommonLoadingInput>
                <WidgetCommonValidator messages={pembayaranValidator.get('dibayar')} />
              </Form.Group>
              <Form.Group >
                <Form.Label>Kembali</Form.Label>
                <WidgetCommonLoadingInput>
                  <Form.Control
                    readOnly={true}
                    disabled={true}
                    value={formatter.formatCurrency(pembayaran.kembali)}
                  />
                </WidgetCommonLoadingInput>
              </Form.Group>
              <Form.Group >
                <Form.Label>Sisa</Form.Label>
                <WidgetCommonLoadingInput>
                  <Form.Control
                    readOnly={true}
                    disabled={true}
                    value={formatter.formatCurrency(pembayaran.sisa)}
                  />
                </WidgetCommonLoadingInput>
              </Form.Group>
              {pembayaran.metode === 'kredit' && (
                <>
                  <Form.Group >
                    <Form.Label>Tempo Pembayaran (Hari)</Form.Label>
                    <WidgetCommonLoadingInput>
                      <Form.Control
                        type={"number"}
                        name={"tempo"}
                        value={pembayaran.tempo}
                        onKeyDown={(e) => e.key === 'Enter' && onPembayaranUpdate()}
                        onChange={(e) => onChangeListener.onChangeNumber(e, pembayaran, setPembayaran)}
                      />
                    </WidgetCommonLoadingInput>
                    <WidgetCommonValidator messages={pembayaranValidator.get('tempo')} />
                  </Form.Group>
                  <Form.Group >
                    <Form.Label>Jatuh Tempo</Form.Label>
                    <WidgetCommonLoadingInput>
                      <Form.Control
                        readOnly={true}
                        disabled={true}
                        value={formatter.formatDate(pembayaran.jatuh_tempo)}
                      />
                    </WidgetCommonLoadingInput>
                  </Form.Group>
                </>
              )}
            </Card.Body>
            {pembelian.is_draft && (
              <Card.Footer className={"d-flex justify-content-end gap-3"}>
                <WidgetCommonLoadingButton variant={"danger"}>
                  <Button variant={"outline-danger"} onClick={onPembelianDelete}>Hapus</Button>
                </WidgetCommonLoadingButton>
                {pembelian.is_draft && (
                  <WidgetCommonLoadingButton>
                    <Button onClick={onPembelianPublish}>Publikasi</Button>
                  </WidgetCommonLoadingButton>
                )}
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default PagePembelianDetail;