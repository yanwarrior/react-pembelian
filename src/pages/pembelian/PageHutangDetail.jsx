import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";
import {useEffect, useState} from "react";
import {hutangInit, hutangValidatorInit} from "../../data/hutang.js";
import useValidator from "../../libs/hooks/useValidator.jsx";
import {pembelianInit} from "../../data/pembelian.js";
import {pembayaranInit} from "../../data/pembayaran.js";
import {BASE_URL} from "../../libs/config/settings.js";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Col, Container, Form, InputGroup, Nav, Table} from "react-bootstrap";
import WidgetCommonTitleAction from "../../widgets/commons/WidgetCommonTitleAction.jsx";
import useFormatter from "../../libs/hooks/useFormatter.jsx";
import {paginationInit} from "../../data/commons.js";
import WidgetCommonFilter from "../../widgets/commons/WidgetCommonFilter.jsx";
import WidgetCommonPagination from "../../widgets/commons/WidgetCommonPagination.jsx";
import WidgetCommonLoadingInput from "../../widgets/commons/WidgetCommonLoadingInput.jsx";
import WidgetCommonLoadingTable from "../../widgets/commons/WidgetCommonLoadingTable.jsx";
import WidgetCommonLoadingButton from "../../widgets/commons/WidgetCommonLoadingButton.jsx";
import WidgetCommonRow from "../../widgets/commons/WidgetCommonRow.jsx";

const PageHutangDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const onChangeListener = useChangeListener();
  const formatter = useFormatter()

  const [hutang, setHutang] = useState(hutangInit);
  const hutangValidator = useValidator(hutangValidatorInit);

  const [pembelian, setPembelian] = useState(pembelianInit);

  const [pembayaran, setPembayaran] = useState(pembayaranInit);

  const onHutangDetail = () => {
    const url = `${BASE_URL}/pembelian/${state.id}/hutang/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        setHutang(response.data);
      })
      .catch((error) => {
        message.error(error);
        // navigate(-1)
        console.log("err", error)
      })
  }

  const onHutangUpdate = () => {
    hutangValidator.reset()
    const url = `${BASE_URL}/pembelian/${state.id}/hutang/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.put(url, hutang, config)
      .then((response) => {
        setHutang(response.data);
        message.success(response)
        onPembelianDetail();
        onPembayaranDetail();
      })
      .catch((error) => {
        hutangValidator.except(error)
        message.error(error);
      })
  }

  useEffect(() => {
    if (state.id) {
      onHutangDetail();
    }
  }, [state.id]);


  const onPembelianDetail = () => {
    const url = `${BASE_URL}/pembelian/${state.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        setPembelian(response.data);
      })
      .catch((error) => {
        message.error(error);
        navigate(-1)
      })
  }

  useEffect(() => {
    if (state.id) {
      onPembelianDetail();
    }
  }, [state.id]);

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

  useEffect(() => {
    if (state.id) {
      onPembayaranDetail()
    }
  }, [state.id]);

  const [daftarItem, setDaftarItem] = useState([]);
  const [itemPaginate, setItemPaginate] = useState(paginationInit);

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

  useEffect(() => {
    if (state.id) {
      onItemList()
    }
  }, [state.id])

  return (
    <>
      <Container className={"mb-4 mt-4"}>
        <WidgetCommonTitleAction title={"Detail Hutang"} />

        <WidgetCommonRow>
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
                  readOnly
                  disabled
                />
              </WidgetCommonLoadingInput>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Supplier *</Form.Label>
              <InputGroup>
                <Form.Control 
                value={pembelian.nama_supplier}
                readOnly
                disabled
              />
              </InputGroup>
            </Form.Group>
          </Col>
        </WidgetCommonRow>

        <WidgetCommonRow>
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
        </WidgetCommonRow>
        <WidgetCommonTitleAction title={"Daftar Item"} />
        <WidgetCommonRow>
          <Col>
            <WidgetCommonLoadingInput>
              <WidgetCommonFilter
                filterset={[
                  { name: "nomor", label: "Nomor" },
                  { name: "nama", label: "Nama" }
                ]}
                callback={onItemFilter}
              />
            </WidgetCommonLoadingInput>
          </Col>
        </WidgetCommonRow>
        <WidgetCommonRow>
          <Col>
            <WidgetCommonLoadingTable>
              <Table responsive={true} bordered={true} hover={true}  striped={true}>
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
                      <Nav.Link className={"text-primary"} onClick={() => onItemDetail(value.id)}>
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
          </Col>
        </WidgetCommonRow>
        <WidgetCommonRow>
          <Col>
            <WidgetCommonLoadingButton variant={"secondary"}>
              <WidgetCommonPagination pagination={itemPaginate} callback={onItemPaginate} />
            </WidgetCommonLoadingButton>
          </Col>
        </WidgetCommonRow>
        <WidgetCommonTitleAction title={"Pembayaran"} />
        <WidgetCommonRow>
          <Col>
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
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>PPN* ({pembayaran.ppn /  100}%)</Form.Label>
              <WidgetCommonLoadingInput>
                <Form.Control
                  type={"number"}
                  name={"ppn"}
                  value={pembayaran.ppn}
                  readOnly
                  disabled
                />
              </WidgetCommonLoadingInput>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Diskon* ({pembayaran.diskon / 100}%)</Form.Label>
              <WidgetCommonLoadingInput>
                <Form.Control
                  type={"number"}
                  name={"diskon"}
                  value={pembayaran.diskon}
                  readOnly
                  disabled
                />
              </WidgetCommonLoadingInput>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Dibayar* ({formatter.formatCurrency(pembayaran.dibayar)})</Form.Label>
              <WidgetCommonLoadingInput>
                <Form.Control
                  type={"number"}
                  name={"dibayar"}
                  value={pembayaran.dibayar}
                  readOnly
                  disabled
                />
              </WidgetCommonLoadingInput>
            </Form.Group>
          </Col>
        </WidgetCommonRow>
        <WidgetCommonRow>
          <Col>
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
          </Col>
          <Col>
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
          </Col>
          <Col>
            {pembayaran.metode === 'kredit' && (
              <Form.Group >
                <Form.Label>Tempo Pembayaran (Hari)</Form.Label>
                <WidgetCommonLoadingInput>
                  <Form.Control
                    type={"number"}
                    name={"tempo"}
                    value={pembayaran.tempo}
                    readOnly
                    disabled
                  />
                </WidgetCommonLoadingInput>
              </Form.Group>
            )}
          </Col>
          <Col>
            {pembayaran.metode === 'kredit' && (
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
            )}
          </Col>
        </WidgetCommonRow>
        <WidgetCommonTitleAction title={"Hutang"} />
        <WidgetCommonRow>
          <Col>
            <Form.Group >
              <Form.Label>Tanggal</Form.Label>
              <WidgetCommonLoadingInput>
                <Form.Control
                  type={"date"}
                  name={"tanggal"}
                  value={hutang.tanggal}
                  onChange={(e) => onChangeListener.onChangeText(e, hutang, setHutang)}
                />
              </WidgetCommonLoadingInput>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Keterangan</Form.Label>
              <WidgetCommonLoadingInput>
                <Form.Control
                  name={"keterangan"}
                  value={hutang.keterangan || ""}
                  onChange={(e) => onChangeListener.onChangeText(e, hutang, setHutang)}
                />
              </WidgetCommonLoadingInput>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Dibayar</Form.Label>
              <WidgetCommonLoadingInput>
                <Form.Control
                  type={"number"}
                  name={"dibayar"}
                  value={hutang.dibayar}
                  onChange={(e) => onChangeListener.onChangeNumber(e, hutang, setHutang)}
                />
              </WidgetCommonLoadingInput>
            </Form.Group>
          </Col>
        </WidgetCommonRow>
        {!pembayaran.lunas && (
          <WidgetCommonRow>
            <Col className="d-flex justify-content-end">
            <WidgetCommonLoadingButton>
              <Button onClick={onHutangUpdate}>Bayar</Button>
            </WidgetCommonLoadingButton>
            </Col>
          </WidgetCommonRow>
        )}
      </Container>
    </>
  )
}

export default PageHutangDetail;