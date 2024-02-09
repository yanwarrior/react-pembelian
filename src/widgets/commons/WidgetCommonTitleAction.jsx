import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";

const WidgetCommonTitleAction = ({title, action}) => {
  return (
    <Row className={"mt-3 mb-3"}>
      <Col>
        <h5>{title}</h5>
      </Col>
      <Col className={"d-flex justify-content-end align-items-center"}>{action}</Col>
    </Row>
  )
}

WidgetCommonTitleAction.propTypes = {
  title: PropTypes.any,
  action: PropTypes.any
}

export default WidgetCommonTitleAction;