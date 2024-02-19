import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import WidgetCommonRow from "./WidgetCommonRow.jsx";

const WidgetCommonTitleAction = ({title, action}) => {
  return (
    <WidgetCommonRow>
      <Col>
        <h5>{title}</h5>
      </Col>
      <Col className={"d-flex justify-content-end align-items-center"}>{action}</Col>
    </WidgetCommonRow>
  )
}

WidgetCommonTitleAction.propTypes = {
  title: PropTypes.any,
  action: PropTypes.any
}

export default WidgetCommonTitleAction;