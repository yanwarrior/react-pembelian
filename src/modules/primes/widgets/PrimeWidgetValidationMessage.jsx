import PropTypes from "prop-types";

const PrimeWidgetValidationMessage = ({ messages }) => {
  return (
    <>
      {messages?.map((message, index) => (
        <small className="p-error" key={index}>{message}</small>
      ))}
    </>
  )
}

PrimeWidgetValidationMessage.propTypes = {
  messages: PropTypes.array
}

export default PrimeWidgetValidationMessage