import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {useEffect, useState} from "react";
import {BASE_URL} from "../../libs/config/settings.js";
import {Button, Card, Col, Container, Nav, Row, Table} from "react-bootstrap";
import WidgetCommonTitleAction from "../../widgets/commons/WidgetCommonTitleAction.jsx";
import useFormatter from "../../libs/hooks/useFormatter.jsx";
import WidgetCommonPagination from "../../widgets/commons/WidgetCommonPagination.jsx";
import WidgetCommonFilter from "../../widgets/commons/WidgetCommonFilter.jsx";
import {useNavigate} from "react-router-dom";
import WidgetCommonRow from "../../widgets/commons/WidgetCommonRow.jsx";

const paginateInit = {
  next: null,
  previous: null,
  count: 0
}

const PageBarangList = () => {
  const navigate = useNavigate();
  const http = useHTTP()
  const jwt = useJWT();
  const message = useMessage();
  const formatter = useFormatter();

  const [daftarBarang, setDaftarBarang] = useState([]);
  const [paginateBarang, setPaginateBarang] = useState(paginateInit);

  const onBarangList = (url, params) => {
    url = url ? url : `${BASE_URL}/barang/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      },
      params,
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        const {results, ...pagination} = response.data;
        setDaftarBarang(results);
        setPaginateBarang(pagination);
      })
      .catch((error) => {
        message.error(error);
      })
  }

  const onBarangPaginate = (url) => {
    onBarangList(url);
  }

  const onBarangFilter = (params) => {
    onBarangList(null, params)
  }

  useEffect(() => {
    onBarangList();
  }, []);


  return (
    <>
      <Container className={"mb-4 mt-4"}>
        <WidgetCommonTitleAction title={"Kelola Barang"} action={(
          <Button onClick={() => navigate('new')}>
            Buat Barang
          </Button>
        )}/>
        <WidgetCommonRow>
          <Col>
            <WidgetCommonFilter
              filterset={[
              {
                name: "nomor",
                label: "Nomor",
              },
              {
                name: "nama",
                label: "Nama",
              },
            ]}
              callback={onBarangFilter}
            />
          </Col>
        </WidgetCommonRow>
        <WidgetCommonRow>
          <Col>
            <Table responsive={true} bordered={true} striped={true}>
              <thead>
              <tr>
                <th>Nomor</th>
                <th>Nama</th>
                <th>Jenis</th>
                <th>Satuan</th>
                <th>Harga Beli</th>
                <th>Harga Jual</th>
                <th>Stok</th>
              </tr>
              </thead>
              <tbody>
              {daftarBarang.map((barang) => (
                <tr key={barang.id}>
                  <td>
                    <Nav.Link
                      className={"text-primary"}
                      onClick={() => navigate('/update', {state: {id: barang.id}})}
                    >
                      {barang.nomor}
                    </Nav.Link>
                  </td>
                  <td>{barang.nama}</td>
                  <td>{barang.jenis}</td>
                  <td>{barang.satuan}</td>
                  <td>{formatter.formatCurrency(barang.harga_beli)}</td>
                  <td>{formatter.formatCurrency(barang.harga_jual)}</td>
                  <td>{barang.stok}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
        </WidgetCommonRow>
        <WidgetCommonRow>
          <Col>
            <WidgetCommonPagination pagination={paginateBarang} callback={onBarangPaginate} />
          </Col>
        </WidgetCommonRow>
      </Container>
    </>
  )
}

export default PageBarangList