import {Col, Form, InputGroup, Row} from "react-bootstrap";
import PropTypes from "prop-types";
import {useState} from "react";

const WidgetCommonFilter = ({filterset, callback, md=6}) => {
  const [field, setField] = useState("");

  const onFilter = (e) => {
    if (e.key !== 'Enter') { return; }
    if (!field) { return; }

    callback({[field]: e.target.value})
  }

  const onSelect = (e) => {
    setField(e.target.value)
  }

  return (
    <>
      <Row>
        <Col md={md}>
          <InputGroup>
            <Form.Select onChange={onSelect} className={'bg-light-subtle'}>
              <option value={null}>Filter by:</option>
              {filterset.map((val, index) => (
                <option key={index} value={val.name}>{val.label}</option>
              ))}
            </Form.Select>
            <Form.Control
              onKeyDown={onFilter}
              className={"w-50 bg-light-subtle"}
            />
          </InputGroup>
        </Col>
      </Row>
    </>
  )
}


WidgetCommonFilter.propTypes = {
  filterset: PropTypes.array,
  callback: PropTypes.func,
  md: PropTypes.number
}
export default WidgetCommonFilter;