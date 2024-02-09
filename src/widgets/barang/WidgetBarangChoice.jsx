import PropTypes from "prop-types";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useFormatter from "../../libs/hooks/useFormatter.jsx";
import {useState} from "react";
import {BASE_URL} from "../../libs/config/settings.js";
import {Button, Nav, Table} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import WidgetCommonPagination from "../commons/WidgetCommonPagination.jsx";
import WidgetCommonFilter from "../commons/WidgetCommonFilter.jsx";
import {BsBoxArrowUpRight} from "react-icons/bs";
import WidgetCommonLoadingButton from "../commons/WidgetCommonLoadingButton.jsx";
import WidgetCommonLoadingInput from "../commons/WidgetCommonLoadingInput.jsx";
import WidgetCommonLoadingTable from "../commons/WidgetCommonLoadingTable.jsx";

const paginateInit = {
  next: null,
  previous: null,
  count: 0
}


const WidgetBarangChoice = ({ callback }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const onShow = () => {
    onBarangList();
  }

  return (
    <>
      <WidgetCommonLoadingButton>
        <Button onClick={handleShow}>
          <BsBoxArrowUpRight /> {" "}Barang
        </Button>
      </WidgetCommonLoadingButton>
      <Modal show={show} onHide={handleClose} onShow={onShow} size={"xl"}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Pilih Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WidgetCommonLoadingInput>
            <WidgetCommonFilter
              filterset={[
                { name: "nomor", label: "Nomor" },
                { name: "nama", label: "Nama" },
              ]}
              callback={onBarangFilter}
            />
          </WidgetCommonLoadingInput>
        </Modal.Body>
        <WidgetCommonLoadingTable>

          <Table responsive={true} borderless={true} hover={true}  striped={"columns"}>
            <thead >
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
                    onClick={() => {
                      callback(barang);
                      handleClose()
                    }}
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
        </WidgetCommonLoadingTable>
        <Modal.Footer>
          <WidgetCommonLoadingButton>
            <WidgetCommonPagination pagination={paginateBarang} callback={onBarangPaginate} />
          </WidgetCommonLoadingButton>
        </Modal.Footer>
      </Modal>
    </>
  )

}

WidgetBarangChoice.propTypes = {
  callback: PropTypes.func
}

export default WidgetBarangChoice;