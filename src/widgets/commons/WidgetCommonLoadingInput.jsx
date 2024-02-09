import {useContext, Children} from "react";
import {ContextApplication} from "../../libs/config/contexts.js";
import {Placeholder} from "react-bootstrap";
import PropTypes from "prop-types";

const WidgetCommonLoadingInput = ({children}) => {
  const application = useContext(ContextApplication);
  if (application.loading.isLoading()) {
    return (
      <div>
        <Placeholder as="p" animation="wave" size={"lg"}>
          <Placeholder xs={12} size={"lg"} />
        </Placeholder>
      </div>
    )
  } else {
    return children
  }
}

WidgetCommonLoadingInput.propTypes = {
  children: PropTypes.any
}
export default WidgetCommonLoadingInput