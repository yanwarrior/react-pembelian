import PropTypes from "prop-types";
import {Pagination} from "react-bootstrap";

const WidgetCommonPagination = ({pagination, callback}) => {
  return (
    <>
      <Pagination>
        <Pagination.Prev
          disabled={!pagination.previous}
          onClick={() => callback(pagination.previous)} />
        <Pagination.Next
          disabled={!pagination.next}
          onClick={() => callback(pagination.next)} />
      </Pagination>
    </>
  )
}

WidgetCommonPagination.propTypes = {
  pagination: PropTypes.object,
  callback: PropTypes.func
}

export default WidgetCommonPagination;