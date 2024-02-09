import PropTypes from "prop-types";
import {Badge} from "react-bootstrap";

const WidgetPembelianDraft = ({isDraft}) => {
  if (isDraft === true) {
    return  <Badge bg={"secondary"}>Draft</Badge>
  } else if (isDraft === false) {
    return <Badge bg={"primary"}>Published</Badge>
  } else {
    return null;
  }
}

WidgetPembelianDraft.propTypes = {
  isDraft: PropTypes.bool
}

export default WidgetPembelianDraft;