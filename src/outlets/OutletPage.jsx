
import {Outlet} from "react-router-dom";
import WidgetCommonNavbar from "../widgets/commons/WidgetCommonNavbar.jsx";
import WidgetUserSignInModal from "../widgets/user/WidgetUserSignInModal.jsx";
import {useContext} from "react";
import {ContextApplication} from "../libs/config/contexts.js";
import WidgetCommonWait from "../widgets/commons/WidgetCommonWait.jsx";


const OutletPage = () => {

  return (
    <>
      {/*<WidgetCommonNavbar />*/}
      <Outlet/>
      <WidgetUserSignInModal />
    </>
  )
}

export default OutletPage