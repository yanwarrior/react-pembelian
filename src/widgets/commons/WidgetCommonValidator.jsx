import PropTypes from "prop-types";

const WidgetCommonValidator = ({ messages }) => {
  return (
    <>
      {messages?.map((message, index) => (
        <small key={index} className={"d-block text-danger"}>
          {message}
        </small>
      ))}
    </>
  )
}

WidgetCommonValidator.propTypes = {
  messages: PropTypes.array
}

export default WidgetCommonValidator;