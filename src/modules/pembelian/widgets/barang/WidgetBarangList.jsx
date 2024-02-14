import PropTypes from "prop-types";
import PrimeWidgetSearch from "../../../primes/widgets/PrimeWidgetSearch.jsx";
import PrimeWidgetPagination from "../../../primes/widgets/PrimeWidgetPagination.jsx";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";

const WidgetBarangList = ({ barang }) => {

  return (
    <>
      <DataTable
        value={barang.data.collections}
        showGridlines
        header={<PrimeWidgetSearch callback={barang.behaviors.search} className={"w-7"}/>}
        footer={<PrimeWidgetPagination pagination={barang.data.paging} callback={barang.behaviors.paginate}/>}
        selectionMode={"single"}
        selection={barang.data.state}
        onSelectionChange={(e) => {
          barang.behaviors.resetState()
          barang.behaviors.get(e.value.id)
        }}
        dataKey={"id"}
      >
        <Column field={"nomor"} header={"Nomor"}></Column>
        <Column field={"jenis"} header={"Jenis"}></Column>
        <Column field={"satuan"} header={"Satuan"}></Column>
        <Column field={"harga_beli"} header={"Harga Beli"}
                body={(value) => barang.module.formatter.formatCurrency(value.harga_beli)}></Column>
        <Column field={"harga_jual"} header={"Harga Jual"}
                body={(value) => barang.module.formatter.formatCurrency(value.harga_jual)}></Column>
        <Column field={"stok"} header={"Stok"}></Column>
      </DataTable>
    </>
  )
}

WidgetBarangList.propTypes = {
  barang: PropTypes.object
}

export default WidgetBarangList