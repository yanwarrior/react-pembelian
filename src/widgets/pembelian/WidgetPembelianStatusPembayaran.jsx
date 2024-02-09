import {Badge} from "react-bootstrap";
import PropTypes from "prop-types";

const WidgetPembelianStatusPembayaran = ({lunas}) => {
  if (!lunas) {
    return <Badge bg={"danger"}>Belum Lunas</Badge>
  }

  return <Badge bg={"success"}>Lunas</Badge>

}

WidgetPembelianStatusPembayaran.propTypes = {
  lunas: PropTypes.bool
}

export default WidgetPembelianStatusPembayaran