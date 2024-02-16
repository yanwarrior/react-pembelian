import {PROP_TYPES} from "../settings.jsx";
import {useEffect} from "react";
import {Dialog} from "primereact/dialog";
import useSupplier from "../hooks/useSupplier.jsx";
import WidgetSupplierForm from "../widgets/supplier/WidgetSupplierForm.jsx";
import WidgetSupplierList from "../widgets/supplier/WidgetSupplierList.jsx";

const FormSupplier = ({ visible, setVisible }) => {
  const supplier = useSupplier();

  useEffect(() => {
    if (visible) {
      supplier.behaviors.all()
    }
  }, [visible]);

  return (
    <>
      <Dialog
        maximizable={true}
        resizable={true}
        header={"Supplier"}
        visible={visible}
        onHide={() => setVisible(!visible)}
      >
        <WidgetSupplierForm supplier={supplier} />
        <WidgetSupplierList supplier={supplier} />
      </Dialog>
    </>
  )
}

FormSupplier.propTypes = PROP_TYPES;

export default FormSupplier;