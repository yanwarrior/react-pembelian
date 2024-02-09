import {useLocation, useNavigate} from "react-router-dom";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {useState} from "react";
import {paginationInit} from "../../data/commons.js";
import {BASE_URL} from "../../libs/config/settings.js";

const PageReturList = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [daftarRetur, setDaftarRetur] = useState([])
  const [paginateRetur, setPaginateRetur] = useState(paginationInit)

  const onReturList = (url, params) => {
    url = url ? url : `${BASE_URL}/pembelian/${state.id}/retur/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      },
      params
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        const {results, ...pagination} = response.data;
        setDaftarRetur(results)
        setPaginateRetur(pagination);
      })
      .catch((error) => {
        message.error(error)
      })
  }

}

export default PageReturList;