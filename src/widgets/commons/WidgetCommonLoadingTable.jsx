import {useContext} from "react";
import {ContextApplication} from "../../libs/config/contexts.js";
import {Placeholder, Table} from "react-bootstrap";
import PropTypes from "prop-types";

const WidgetCommonLoadingTable = ({children}) => {
  const application = useContext(ContextApplication);

  if (application.loading.isLoading()) {
    return (
      <Table responsive={true}>
        <tbody>
        <tr>
          <td>
            <Placeholder as="p" animation="glow" size={"lg"}>
              <Placeholder xs={12} size={"lg"}/>
            </Placeholder>
          </td>
          <td>
            <Placeholder as="p" animation="glow" size={"lg"}>
              <Placeholder xs={12} size={"lg"}/>
            </Placeholder>
          </td>
          <td>
            <Placeholder as="p" animation="glow" size={"lg"}>
              <Placeholder xs={12} size={"lg"}/>
            </Placeholder>
          </td>
          <td>
            <Placeholder as="p" animation="glow" size={"lg"}>
              <Placeholder xs={12} size={"lg"}/>
            </Placeholder>
          </td>
          <td>
            <Placeholder as="p" animation="glow" size={"lg"}>
              <Placeholder xs={12} size={"lg"}/>
            </Placeholder>
          </td>
          <td>
            <Placeholder as="p" animation="glow" size={"lg"}>
              <Placeholder xs={12} size={"lg"}/>
            </Placeholder>
          </td>
        </tr>
        </tbody>
      </Table>
    )
  } else {
    return children
  }
}

WidgetCommonLoadingTable.propTypes = {
  children: PropTypes.any
}
export default WidgetCommonLoadingTable