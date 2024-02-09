import PropTypes from "prop-types";
import {InputText} from "primereact/inputtext";

const PrimeWidgetSearch = ({ callback, className="" }) => {
  return <InputText onKeyDown={callback} placeholder="Keyword Search" className={className} />
}

PrimeWidgetSearch.propTypes = {
  callback: PropTypes.func,
  className: PropTypes.string
}

export default PrimeWidgetSearch;