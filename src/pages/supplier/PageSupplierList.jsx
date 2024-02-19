import {useNavigate} from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {useEffect, useState} from "react";
import {BASE_URL} from "../../libs/config/settings.js";
import {Button, Card, Col, Container, Nav, Row, Table} from "react-bootstrap";
import WidgetCommonTitleAction from "../../widgets/commons/WidgetCommonTitleAction.jsx";
import WidgetCommonFilter from "../../widgets/commons/WidgetCommonFilter.jsx";
import WidgetCommonPagination from "../../widgets/commons/WidgetCommonPagination.jsx";
import WidgetCommonRow from "../../widgets/commons/WidgetCommonRow.jsx";

const paginateInit = {
  next: null,
  previous: null,
  count: 0
}

const PageSupplierList = () => {
  const navigate = useNavigate();
  const http = useHTTP()
  const jwt = useJWT();
  const message = useMessage();

  const [daftarSupplier, setDaftarSupplier] = useState([])
  const [paginateSupplier, setPaginateSupplier] = useState(paginateInit);

  const onSupplierList = (url, params) => {
    url = url ? url : `${BASE_URL}/supplier/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      },
      params,
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        const {results, ...pagination} = response.data;
        setDaftarSupplier(results);
        setPaginateSupplier(pagination);
      })
      .catch((error) => {
        message.error(error);
      })
  }

  const onSupplierPaginate = (url) => {
    onSupplierList(url);
  }

  const onSupplierFilter = (params) => {
    onSupplierList(null, params);
  }

  useEffect(() => {
    onSupplierList()
  }, []);

  return (
    <>
      <Container className={"mb-4 mt-4"}>
        <WidgetCommonTitleAction title={"Kelola Barang"} action={(
          <Button onClick={() => navigate('/supplier/new')}>
            Buat Supplier
          </Button>
        )}/>
        <WidgetCommonRow>
          <Col>
            <WidgetCommonFilter
              callback={onSupplierFilter}
              filterset={[
                {name: "nomor", label: "Nomor"},
                {name: "nama", label: "Nama"},
                {name: "telepon", label: "Telepon"},
                {name: "bank", label: "Bank"},
                {name: "contact_person", label: "Contact Person"},
              ]} />
          </Col>
        </WidgetCommonRow>
        <WidgetCommonRow>
          <Col>
            <Table responsive={true} bordered={true} striped={true}>
              <thead>
              <tr>
                <th>Nomor</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Telepon</th>
                <th>Contact Person</th>
                <th>Bank</th>
                <th>Rekening</th>
              </tr>
              </thead>
              <tbody>
              {daftarSupplier.map((supplier) => (
                <tr key={supplier.id}>
                  <td>
                    <Nav.Link
                      className={"text-primary"}
                      onClick={() => navigate("/supplier/update", {state: {id: supplier.id}})}
                    >
                      {supplier.nomor}
                    </Nav.Link>
                  </td>
                  <td>{supplier.nama}</td>
                  <td>{supplier.alamat}</td>
                  <td>{supplier.telepon}</td>
                  <td>{supplier.contact_person}</td>
                  <td>{supplier.bank}</td>
                  <td>{supplier.rekening}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
        </WidgetCommonRow>
        <WidgetCommonRow>
          <Col>
            <WidgetCommonPagination pagination={paginateSupplier} callback={onSupplierPaginate} />
          </Col>
        </WidgetCommonRow>
      </Container>
    </>
  )
}

export default PageSupplierList;