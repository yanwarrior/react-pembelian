import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useFormatter from "../../libs/hooks/useFormatter.jsx";
import {useEffect, useState} from "react";
import {BASE_URL} from "../../libs/config/settings.js";

const paginateInit = {
  next: null,
  previous: null,
  count: 0
}

const useBarangList = () => {
  const http = useHTTP()
  const jwt = useJWT();
  const message = useMessage();

  const [daftarBarang, setDaftarBarang] = useState([]);
  const [paginateBarang, setPaginateBarang] = useState(paginateInit);

  const onBarangList = (url, params) => {
    url = url ? url : `${BASE_URL}/barang/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      },
      params,
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        const {results, ...pagination} = response.data;
        setDaftarBarang(results);
        setPaginateBarang(pagination);
      })
      .catch((error) => {
        message.error(error);
      })
  }

  const onBarangPaginate = (url) => {
    onBarangList(url);
  }

  const onBarangFilter = (params) => {
    onBarangList(null, params)
  }

  useEffect(() => {
    onBarangList();
  }, []);

  return {
    daftarBarang,
    setDaftarBarang,
    onBarangList,
    onBarangPaginate,
    onBarangFilter,
    paginateBarang,
    setPaginateBarang
  }
}

export default useBarangList;