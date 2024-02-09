import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import {useEffect, useRef, useState} from "react";
import useValidator from "../../libs/hooks/useValidator.jsx";
import {BASE_URL} from "../../libs/config/settings.js";

const pembelianInit = {
  id: null,
  nomor: "",
  tanggal: "",
  supplier: null,
  user: null,
  is_draf: true,
  nama_supplier: "",
  nomor_supplier: "",
  pembayaran_lunas: false,
  jumlah_barang: 0,
  metode_pembayaran: ""
}

const pembelianValidatorInit = {
  tanggal: [],
  supplier: []
}

const usePembelianDetail = (id) => {
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();

  const [pembelian, setPembelian] = useState(pembelianInit);
  const pembelianValidator = useValidator(pembelianValidatorInit);
  const tanggalRef = useRef({value: ""})

  const onPembelianDetail = () => {
    const url = `${BASE_URL}/pembelian/${id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        setPembelian(response.data)
        tanggalRef.current.value = response.data.tanggal;
      })
      .catch((error) => {
        message.error(error);
      })
  }

  const onPembelianUpdate = () => {
    pembelianValidator.reset();
    const url = `${BASE_URL}/pembelian/${id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    const payload = {...pembelian, tanggal: tanggalRef.current.value}

    http.privateHTTP.put(url, payload, config)
      .then((response) => {
        setPembelian(response.data);

      })
      .catch((error) => {
        pembelianValidator.except(error)
        message.error(error);
      })
  }

  const onPembelianPublish = () => {
    pembelianValidator.reset();
    const url = `${BASE_URL}/pembelian/${id}/publish/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.post(url, null, config)
      .then((response) => {
        message.success(response);
      })
      .catch((error) => {
        pembelianValidator.except(error);
        message.error(error);
      })
  }

  useEffect(() => {
    if (id) {
      onPembelianDetail()
    }
  }, [id]);

  return {
    pembelian,
    setPembelian,
    pembelianValidator,
    onPembelianUpdate,
    onPembelianDetail,
    onPembelianPublish,
    tanggalRef,
  }
}

export default usePembelianDetail;