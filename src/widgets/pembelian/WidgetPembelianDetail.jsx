import {Badge, Col, Form, Row} from "react-bootstrap";
import WidgetCommonValidator from "../commons/WidgetCommonValidator.jsx";
import PropTypes from "prop-types";
import WidgetCommonLoadingSpinner from "../commons/WidgetCommonLoadingSpinner.jsx";

const WidgetPembelianDetail = ({pembelian, setPembelian, onPembelianUpdate, validator, onChangeListener}) => {

  return (
    <>
      {pembelian.id && (
      <>
        <Form.Group className={"mb-3"}>
          <Form.Label>Nomor</Form.Label>
          <Form.Control value={pembelian.nomor || ""} readOnly={true}/>
        </Form.Group>

        <Form.Group className={"mb-3"}>
          <Form.Label>Tanggal</Form.Label>
          <Form.Control
            type={"date"}
            name={"tanggal"}
            value={pembelian.tanggal}
            onBlurCapture={onPembelianUpdate}
            onChange={(e) => onChangeListener.onChangeText(e, pembelian, setPembelian)}
          />
          <WidgetCommonValidator messages={validator.get('tanggal')} />
        </Form.Group>
      </>
        )}
    </>
  )
}

WidgetPembelianDetail.propTypes = {
  pembelian: PropTypes.object,
  tanggalRef: PropTypes.any,
  onPembelianUpdate: PropTypes.func,
  validator: PropTypes.any,
  onChangeListener: PropTypes.any,
  setPembelian: PropTypes.func
}

export default WidgetPembelianDetail;