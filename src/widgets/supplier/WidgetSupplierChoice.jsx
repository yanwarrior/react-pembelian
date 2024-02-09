import {Button, Card, Form, InputGroup, Nav, Table} from "react-bootstrap";
import WidgetCommonFilter from "../commons/WidgetCommonFilter.jsx";
import WidgetCommonPagination from "../commons/WidgetCommonPagination.jsx";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import {useState} from "react";
import {BASE_URL} from "../../libs/config/settings.js";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {BsArrowUpCircle, BsBoxArrowUpRight, BsShare} from "react-icons/bs";
import WidgetCommonLoadingButton from "../commons/WidgetCommonLoadingButton.jsx";
import WidgetCommonLoadingTable from "../commons/WidgetCommonLoadingTable.jsx";
import WidgetCommonLoadingInput from "../commons/WidgetCommonLoadingInput.jsx";

const paginationInit = {
  count: 0,
  previous: null,
  next: null
}

const WidgetSupplierChoice = ({callback}) => {
  const jwt = useJWT();
  const http = useHTTP();
  const message = useMessage();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [daftarSupplier, setDaftarSupplier] = useState([])
  const [paginateSupplier, setPaginateSupplier] = useState(paginationInit)

  const onSupplierList = (url, params) => {
    url = url ? url : `${BASE_URL}/supplier/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      },
      params
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        const {results, ...pagination} = response.data;
        setDaftarSupplier(results);
        setPaginateSupplier(pagination)
      })
      .catch((error) => {
        message.error(error);
      })
  }

  const onSupplierFilter = (params) => {
    onSupplierList(null, params);
  }

  const onSupplierPaginate = (url) => {
    onSupplierList(url)
  }

  const onShow = () => {
    onSupplierList()
  }

  return (
    <>
      <WidgetCommonLoadingButton>
        <Button onClick={handleShow}>
          <BsBoxArrowUpRight /> {" "} Supplier
        </Button>
      </WidgetCommonLoadingButton>
      <Modal show={show} onHide={handleClose} onShow={onShow} size={"xl"} >
        <Modal.Header closeButton>
          <Modal.Title>Pilih Supplier</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <WidgetCommonLoadingInput>
              <WidgetCommonFilter
                callback={onSupplierFilter}
                filterset={[
                  {name: "nomor", label: "Nomor"},
                  {name: "nama", label: "Nama"},
                  {name: "telepon", label: "Telepon"},
                  {name: "bank", label: "Bank"},
                  {name: "contact_person", label: "Contact Person"},
                ]} />
            </WidgetCommonLoadingInput>
          </Modal.Body>
          <WidgetCommonLoadingTable>
            <Table responsive={true} borderless={true} hover={true} striped={"columns"} >
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
              {daftarSupplier.map((value) => (
                <tr key={value.id}>
                  <td>
                    <Nav.Link
                      className={"text-primary"}
                      onClick={() => {
                        callback(value)
                        handleClose()
                      }}
                    >
                      {value.nomor}
                    </Nav.Link>
                  </td>
                  <td>{value.nama}</td>
                  <td>{value.alamat}</td>
                  <td>{value.telepon}</td>
                  <td>{value.contact_person}</td>
                  <td>{value.bank}</td>
                  <td>{value.rekening}</td>
                </tr>
              ))}
              </tbody>
            </Table>
          </WidgetCommonLoadingTable>
        <Modal.Footer>
          <WidgetCommonPagination pagination={paginateSupplier} callback={onSupplierPaginate} />
        </Modal.Footer>
      </Modal>
    </>
  )
}

WidgetSupplierChoice.propTypes = {
  callback: PropTypes.func,
}

export default WidgetSupplierChoice;