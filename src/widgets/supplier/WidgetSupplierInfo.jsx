import PropTypes from "prop-types";
import {Button, Card, Nav, Table} from "react-bootstrap";
const WidgetSupplierInfo = ({supplier, callback}) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Subtitle>Supplier Terpilih</Card.Subtitle>
        </Card.Body>
        <Table responsive={true} className={"border-top"} striped={"columns"} >
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
            <tr>
              <td>
                <Nav.Link
                  className={"text-primary"}
                  onClick={callback}
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
          </tbody>
        </Table>
        <Card.Footer>
          <Button onClick={callback}>Pilih Supplier</Button>
        </Card.Footer>
      </Card>
    </>
  )
}


WidgetSupplierInfo.propTypes = {
  supplier: PropTypes.object,
  callback: PropTypes.func
}

export default WidgetSupplierInfo