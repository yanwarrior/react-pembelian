import {Card, Table} from "react-bootstrap";
import useFormatter from "../../libs/hooks/useFormatter.jsx";
import PropTypes from "prop-types";
import WidgetCommonFilter from "../commons/WidgetCommonFilter.jsx";
import WidgetCommonPagination from "../commons/WidgetCommonPagination.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useHTTP from "../../libs/hooks/useHTTP.jsx";

const WidgetItemList = () => {
  const formatter = useFormatter();
  const jwt = useJWT();
  const http = useHTTP();

  return (
    <>
      <Card>
        <Card.Body>
          <WidgetCommonFilter filterset={[
            {
              name: "nomor",
              label: "Nomor",
            },
            {
              name: "nama",
              label: "Nama",
            },
          ]} callback={onItemFilter}
          />
        </Card.Body>
        <Table responsive={true} borderless={true} striped={true}>
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
            <tr key={value.id} onClick={() => {
              setItem(value);
            }}>
              <td>{value.nomor_barang}</td>
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
        <Card.Footer>
          <WidgetCommonPagination pagination={paginateItem} callback={onItemPaginate} />
        </Card.Footer>
      </Card>
    </>
  )
}



export default WidgetItemList;