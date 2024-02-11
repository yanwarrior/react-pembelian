import {useState} from "react";
import useHTTP from "../../../libs/hooks/useHTTP.jsx";
import useJWT from "../../../libs/hooks/useJWT.jsx";
import useMessage from "../../../libs/hooks/useMessage.jsx";
import {PAGINATION_INIT, SUPPLIER} from "../settings.jsx";
import {BASE_URL} from "../../../libs/config/settings.js";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {DataTable} from "primereact/datatable";
import PrimeWidgetSearch from "../../primes/widgets/PrimeWidgetSearch.jsx";
import PrimeWidgetPagination from "../../primes/widgets/PrimeWidgetPagination.jsx";
import {Column} from "primereact/column";
import PropTypes from "prop-types";

const WidgetSupplierChoice = ({callback}) => {
  const [show, setShow] = useState(false);

  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarSupplier, setDaftarSupplier] = useState([]);
  const [paginateSupplier, setPaginateSupplier] = useState(PAGINATION_INIT);
  const [supplier, setSupplier] = useState(SUPPLIER);

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
        setPaginateSupplier(pagination);
      })
      .catch((error) => {
        message.error(error)
      })
  }

  const onSupplierSearch = (e) => {
    if (e.key === 'Enter') {
      onSupplierList(null, {search: e.target.value})
    }
  }

  const onSupplierPaginate = (isPrev) => {
    const url = isPrev ? paginateSupplier.previous : paginateSupplier.next;
    onSupplierList(url);
  }

  const onShow = () => {
    onSupplierList();
  }

  return (
    <>
      <Button onClick={() => setShow(true)}>Supplier</Button>
      <Dialog
        resizable={true}
        header={"Pilih Supplier"}
        visible={show}
        onHide={() => setShow(false)}
        onShow={onShow}
      >
        <DataTable
          value={daftarSupplier}
          showGridlines={true}
          header={<PrimeWidgetSearch callback={onSupplierSearch} className={"w-7"} /> }
          footer={<PrimeWidgetPagination pagination={paginateSupplier} callback={onSupplierPaginate} /> }
          selectionMode={"single"}
          selection={supplier}
          onSelectionChange={(e) => {
            setSupplier(e.value);
            callback(e.value)
          }}
        >
          <Column field={"nomor"} header={"Nomor"}></Column>
          <Column field={"nama"} header={"Nama"}></Column>
          <Column field={"telepon"} header={"Telepon"}></Column>
          <Column field={"alamat"} header={"Alamat"}></Column>
          <Column field={"contact_person"} header={"Contact Person"}></Column>
          <Column field={"bank"} header={"Bank"}></Column>
          <Column field={"rekening"} header={"Rekening"}></Column>
        </DataTable>
      </Dialog>
    </>
  )
}

WidgetSupplierChoice.propTypes = {
  callback: PropTypes.func
}

export default WidgetSupplierChoice;