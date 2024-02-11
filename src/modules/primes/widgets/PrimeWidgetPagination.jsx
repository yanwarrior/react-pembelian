import {Button} from "primereact/button";
import PropTypes from "prop-types";

const PrimeWidgetPagination = ({ pagination, callback }) => {
  return (
    <>
      <Button disabled={!pagination.previous} onClick={() => callback(true)}>
        Previous
      </Button>
      <Button disabled={!pagination.next} onClick={() => callback(false)}>
        Next
      </Button>
    </>
  )
}

PrimeWidgetPagination.propTypes = {
  pagination: PropTypes.object,
  callback: PropTypes.func
}

export default PrimeWidgetPagination;