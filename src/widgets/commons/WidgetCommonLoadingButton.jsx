import {useContext, Children} from "react";
import {ContextApplication} from "../../libs/config/contexts.js";
import {Placeholder} from "react-bootstrap";
import PropTypes from "prop-types";

const WidgetCommonLoadingButton = ({children, variant="primary"}) => {
  const application = useContext(ContextApplication);
  if (application.loading.isLoading()) {
    return (
      <Placeholder.Button xs={4} aria-hidden="true" variant={variant} animation={"wave"} />
    )
  } else {
    return children
  }
}

WidgetCommonLoadingButton.propTypes = {
  children: PropTypes.any,
  variant: PropTypes.string
}
export default WidgetCommonLoadingButton