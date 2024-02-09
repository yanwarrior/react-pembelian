import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useFormatter from "../../libs/hooks/useFormatter.jsx";
import {useEffect, useState} from "react";
import {BASE_URL} from "../../libs/config/settings.js";
import {Card, Nav, Table} from "react-bootstrap";
import WidgetCommonFilter from "../commons/WidgetCommonFilter.jsx";
import WidgetCommonPagination from "../commons/WidgetCommonPagination.jsx";
import PropTypes from "prop-types";

const paginateInit = {
  next: null,
  previous: null,
  count: 0
}

const WidgetBarangListbox = ({barangHook, callback}) => {
  const formatter = useFormatter();

  return (
    <Card>
      <Card.Body>
        <WidgetCommonFilter
          filterset={[
            { name: "nomor", label: "Nomor", },
            { name: "nama", label: "Nama", },
          ]}
          callback={barangHook.onBarangFilter}
        />
      </Card.Body>
      <Table responsive={true} borderless={true} striped={true}>
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
        {barangHook.daftarBarang.map((barang) => (
          <tr key={barang.id}>
            <td>
              <Nav.Link
                className={"text-primary"}
                onClick={() => callback(barang)}
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
      <Card.Footer>
        <WidgetCommonPagination pagination={barangHook.paginateBarang} callback={barangHook.onBarangPaginate} />
      </Card.Footer>
    </Card>
  )
}

WidgetBarangListbox.propTypes = {
  callback: PropTypes.func,
  barangHook: PropTypes.object
}

export default WidgetBarangListbox;