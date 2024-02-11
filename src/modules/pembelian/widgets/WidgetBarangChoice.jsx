import PropTypes from "prop-types";
import {useState} from "react";
import useHTTP from "../../../libs/hooks/useHTTP.jsx";
import useJWT from "../../../libs/hooks/useJWT.jsx";
import useMessage from "../../../libs/hooks/useMessage.jsx";
import {BARANG, PAGINATION_INIT} from "../settings.jsx";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {DataTable} from "primereact/datatable";
import PrimeWidgetSearch from "../../primes/widgets/PrimeWidgetSearch.jsx";
import PrimeWidgetPagination from "../../primes/widgets/PrimeWidgetPagination.jsx";
import {Column} from "primereact/column";
import useFormatter from "../../../libs/hooks/useFormatter.jsx";
import {BASE_URL} from "../../../libs/config/settings.js";

const WidgetBarangChoice = ({ callback }) => {
  const [show, setShow] = useState(false);

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const formatter = useFormatter();

  const [daftarBarang, setDaftarBarang] = useState([]);
  const [paginateBarang, setPaginateBarang] = useState(PAGINATION_INIT);
  const [barang, setBarang] = useState(BARANG);

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

  const onBarangSearch = (e) => {
    if (e.key === 'Enter') {
      onBarangList(null, {search: e.target.value})
    }
  }

  const onBarangPaginate = (isPrev) => {
    const url = isPrev ? paginateBarang.previous : paginateBarang.next
    onBarangList(url);
  }

  const onShow = () => {
    onBarangList()
  }

  return (
    <>
      <Button onClick={() => setShow(true)}>Barang</Button>
      <Dialog
        resizable={true}
        header={"Pilih Barang"}
        visible={show}
        onHide={() => setShow(false)}
        onShow={onShow}
      >
        <DataTable
          value={daftarBarang}
          showGridlines
          header={<PrimeWidgetSearch callback={onBarangSearch} className={"w-7"}/>}
          footer={<PrimeWidgetPagination pagination={paginateBarang} callback={onBarangPaginate}/>}
          selectionMode={"single"}
          selection={barang}
          onSelectionChange={(e) => {
            setBarang(e.value);
            callback(e.value)
          }}
          dataKey={"id"}
        >
          <Column field={"nomor"} header={"Nomor"}></Column>
          <Column field={"jenis"} header={"Jenis"}></Column>
          <Column field={"satuan"} header={"Satuan"}></Column>
          <Column field={"harga_beli"} header={"Harga Beli"}
                  body={(value) => formatter.formatCurrency(value.harga_beli)}></Column>
          <Column field={"harga_jual"} header={"Harga Jual"}
                  body={(value) => formatter.formatCurrency(value.harga_jual)}></Column>
          <Column field={"stok"} header={"Stok"}></Column>
        </DataTable>
      </Dialog>
    </>
  )

}

WidgetBarangChoice.propTypes = {
  callback: PropTypes.func
}

export default WidgetBarangChoice;