import {useNavigate} from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {useEffect, useState} from "react";
import {BASE_URL} from "../../libs/config/settings.js";
import {Button, Card, Col, Container, Nav, Row, Table} from "react-bootstrap";
import WidgetCommonTitleAction from "../../widgets/commons/WidgetCommonTitleAction.jsx";
import WidgetCommonFilter from "../../widgets/commons/WidgetCommonFilter.jsx";
import useFormatter from "../../libs/hooks/useFormatter.jsx";
import WidgetPembelianDraft from "../../widgets/pembelian/WidgetPembelianDraft.jsx";
import WidgetPembelianStatusPembayaran from "../../widgets/pembelian/WidgetPembelianStatusPembayaran.jsx";
import WidgetCommonPagination from "../../widgets/commons/WidgetCommonPagination.jsx";
import WidgetCommonLoadingInput from "../../widgets/commons/WidgetCommonLoadingInput.jsx";
import WidgetCommonLoadingTable from "../../widgets/commons/WidgetCommonLoadingTable.jsx";
import WidgetCommonLoadingButton from "../../widgets/commons/WidgetCommonLoadingButton.jsx";
import WidgetCommonRow from "../../widgets/commons/WidgetCommonRow.jsx";

const paginateInit = {
  next: null,
  previous: null,
  count: 0
}

const PageHutangList = () => {
  const navigate = useNavigate();
  const http = useHTTP()
  const jwt = useJWT();
  const message = useMessage();
  const formatter = useFormatter();

  const [daftarPembelian, setDaftarPembelian] = useState([]);
  const [paginatePembelian, setPaginatePembelian] = useState(paginateInit);

  const onPembelianList = (url, params) => {
    url = url ? url : `${BASE_URL}/pembelian/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      },
      params: {...params, is_draft: false, pembayaran_pembelian__lunas: false},
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        const {results, ...paginaton} = response.data;
        setDaftarPembelian(results)
        setPaginatePembelian(paginaton);
      }).catch((error) => {
      message.error(error);
    });
  }

  const onPembelianPaginate = (url) => {
    onPembelianList(url);
  }

  const onPembelianFilter = (params) => {
    onPembelianList(null, params);
  }

  useEffect(() => {
    onPembelianList();
  }, []);

  return (
    <>
      <Container className={"mb-4 mt-4"}>
        <WidgetCommonTitleAction title={"Hutang Pembelian"} />
        <WidgetCommonRow>
          <Col>
            <WidgetCommonFilter
              callback={onPembelianFilter}
              filterset={[
                {name: "nomor", label: "Nomor Pembelian"},
                {name: "supplier__nama", label: "Nama Supplier"},
                {name: "supplier__telepon", label: "Telepon Supplier"},
                {name: "supplier__contact_person", label: "Contact Person"},
              ]}
            />
          </Col>
        </WidgetCommonRow>
        <WidgetCommonRow>
          <Col>
            <Table responsive={true} borderless={true} striped={true}>
              <thead>
              <tr>
                <th>Nomor</th>
                <th>Tanggal</th>
                <th>Nomor Supplier</th>
                <th>Nama Supplier</th>
                <th>Jumlah Barang</th>
                <th>Status Pembayaran</th>
                <th>Metode Pembayaran</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
              {daftarPembelian.map((pembelian) => (
                <tr key={pembelian.id}>
                  <td>
                    <Nav.Link onClick={() => navigate("/pembelian/hutang/detail", {state: {id: pembelian.id}})} className={"text-primary"}>
                      {pembelian.nomor}
                    </Nav.Link>
                  </td>
                  <td>{formatter.formatDate(pembelian.tanggal)}</td>
                  <td>{pembelian.nomor_supplier}</td>
                  <td>{pembelian.nama_supplier}</td>
                  <td>{pembelian.jumlah_barang}</td>
                  <td><WidgetPembelianStatusPembayaran lunas={pembelian.pembayaran_lunas} /> </td>
                  <td>{pembelian.metode_pembayaran}</td>
                  <td><WidgetPembelianDraft isDraft={pembelian.is_draft} /></td>
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
        </WidgetCommonRow>
        <WidgetCommonRow>
          <Col>
            <WidgetCommonLoadingButton>
              <WidgetCommonPagination pagination={paginatePembelian} callback={onPembelianPaginate} />
            </WidgetCommonLoadingButton>
          </Col>
        </WidgetCommonRow>
      </Container>
    </>
  )
}

export default PageHutangList;