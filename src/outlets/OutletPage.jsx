
import {Outlet} from "react-router-dom";
import WidgetCommonNavbar from "../widgets/commons/WidgetCommonNavbar.jsx";
import WidgetUserSignInModal from "../widgets/user/WidgetUserSignInModal.jsx";


const OutletPage = () => {

  return (
    <>
      <WidgetCommonNavbar />
      <Outlet/>
      <WidgetUserSignInModal />
    </>
  )
}

export default OutletPage