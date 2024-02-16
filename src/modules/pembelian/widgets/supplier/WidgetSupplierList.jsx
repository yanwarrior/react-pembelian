import PropTypes from "prop-types";
import PrimeWidgetSearch from "../../../primes/widgets/PrimeWidgetSearch.jsx";
import PrimeWidgetPagination from "../../../primes/widgets/PrimeWidgetPagination.jsx";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";

const WidgetSupplierList = ({ supplier }) => {
  return (
    <>
      <DataTable
        value={supplier.data.collections}
        showGridlines
        header={<PrimeWidgetSearch callback={supplier.behaviors.search} className={"w-7"}/>}
        footer={<PrimeWidgetPagination pagination={supplier.data.paging} callback={supplier.behaviors.paginate}/>}
        selectionMode={"single"}
        selection={supplier.data.state}
        onSelectionChange={(e) => {
          supplier.data.validator.reset();
          supplier.behaviors.resetState();
          supplier.behaviors.get(e.value.id);
        }}
        dataKey={"id"}
      >
        <Column field={"nomor"} header={"Nomor"}></Column>
        <Column field={"nama"} header={"Nama"}></Column>
        <Column field={"telepon"} header={"Telepon"}></Column>
        <Column field={"alamat"} header={"Alamat"}></Column>
        <Column field={"contact_person"} header={"Contact Person"}></Column>
        <Column field={"bank"} header={"Bank"}></Column>
        <Column field={"rekening"} header={"Rekening"}></Column>
      </DataTable>
    </>
  )
}

WidgetSupplierList.propTypes = {
  supplier: PropTypes.object
}

export default WidgetSupplierList;