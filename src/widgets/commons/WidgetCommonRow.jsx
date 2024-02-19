import PropTypes from "prop-types";
import {Row} from "react-bootstrap";

const WidgetCommonRow = ({children}) => {

  return (
    <Row className={"my-3 d-flex flex-column gap-3 flex-lg-row gap-lg-0"}>
      {children}
    </Row>
  )
}

WidgetCommonRow.propTypes = {
  children: PropTypes.any
}

export default WidgetCommonRow;