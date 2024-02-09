import Barcode from 'react-barcode';
import PropTypes from "prop-types";

const PrimeWidgetBarcode = ({ value }) => {
  return <Barcode value={value} height={50} />
}

PrimeWidgetBarcode.propTypes = {
  value: PropTypes.string
}

export default PrimeWidgetBarcode;