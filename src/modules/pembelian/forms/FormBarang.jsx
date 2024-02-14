import {useEffect} from "react";
import {Dialog} from "primereact/dialog";
import useBarang from "../hooks/useBarang.jsx";
import WidgetBarangForm from "../widgets/barang/WidgetBarangForm.jsx";
import WidgetBarangList from "../widgets/barang/WidgetBarangList.jsx";
import {PROP_TYPES} from "../settings.jsx";

const FormBarang = ({ visible, setVisible }) => {
  const barang = useBarang();

  useEffect(() => {
    if (visible) {
      barang.behaviors.all()
    }
  }, [visible]);

  return (
    <>
      <Dialog
        maximizable={true}
        resizable={true}
        header={"Barang"}
        visible={visible}
        onHide={() => setVisible(!visible)}
      >
        <WidgetBarangForm barang={barang} />
        <WidgetBarangList barang={barang} />
      </Dialog>
    </>
  )
}

FormBarang.propTypes = PROP_TYPES

export default FormBarang