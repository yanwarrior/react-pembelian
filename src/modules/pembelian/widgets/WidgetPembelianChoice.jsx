import {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import useHTTP from "../../../libs/hooks/useHTTP.jsx";
import useJWT from "../../../libs/hooks/useJWT.jsx";
import useMessage from "../../../libs/hooks/useMessage.jsx";
import {PAGINATION_INIT, PEMBELIAN} from "../settings.jsx";
import {BASE_URL} from "../../../libs/config/settings.js";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import PrimeWidgetSearch from "../../primes/widgets/PrimeWidgetSearch.jsx";
import PrimeWidgetPagination from "../../primes/widgets/PrimeWidgetPagination.jsx";
import PropTypes from "prop-types";

const WidgetPembelianChoice = ({ callback }) => {
  const [show, setShow] = useState(false);

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarPembelian, setDaftarPembelian] = useState([]);
  const [paginatePembelian, setPaginatePembelian] = useState(PAGINATION_INIT);
  const [pembelian, setPembelian] = useState(PEMBELIAN);

  const onPembelianList = (url, params) => {
    url = url ? url : `${BASE_URL}/pembelian/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      },
      params
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        const {results, ...pagination} = response.data;
        setDaftarPembelian(results);
        setPaginatePembelian(pagination);
      })
      .catch((error) => {
        console.log(error)
        message.error(error)
      })
  }

  const onPembelianSearch = (e) => {
    if (e.key === 'Enter') {
      onPembelianList(null, {search: e.target.value})
    }
  }

  const onPembelianPaginate = (isPrev) => {
    const url = isPrev ? paginatePembelian.previous : paginatePembelian.next;
    onPembelianList(url);
  }

  const onShow = () => {
    onPembelianList();
  }

  return (
    <>
      <Button onClick={() => setShow(true)}>Pembelian</Button>
      <Dialog
        resizable={true}
        header={"Pilih Pembelian"}
        visible={show}
        onHide={() => setShow(false)}
        onShow={onShow}
      >
        <DataTable
          value={daftarPembelian}
          showGridlines={true}
          header={<PrimeWidgetSearch callback={onPembelianSearch} className={"w-7"} /> }
          footer={<PrimeWidgetPagination pagination={paginatePembelian} callback={onPembelianPaginate}/>}
          selectionMode={"single"}
          selection={pembelian}
          onSelectionChange={(e) => {
            setPembelian(e.value);
            callback(e.value)
          }}
        >
          <Column field={"nomor"} header={"Nomor"}></Column>
          <Column field={"tanggal"} header={"Tanggal"}></Column>
          <Column field={"nomor_supplier"} header={"Nomor Supplier"}></Column>
          <Column field={"nama_supplier"} header={"Nama Supplier"}></Column>
          <Column field={"jumlah_barang"} header={"Jumlah Barang"}></Column>
          <Column field={"pembayaran_lunas"} header={"Pembayaran Lunas"}></Column>
          <Column field={"metode_pembayaran"} header={"Metode Pembayaran"}></Column>
          <Column field={"is_draft"} header={"Draft"}></Column>
        </DataTable>
      </Dialog>
    </>
  )
}

WidgetPembelianChoice.propTypes = {
  callback: PropTypes.func
}

export default WidgetPembelianChoice;