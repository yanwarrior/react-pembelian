import {useLocation, useNavigate} from "react-router-dom";
import useHTTP from "../../../libs/hooks/useHTTP.jsx";
import useJWT from "../../../libs/hooks/useJWT.jsx";
import useMessage from "../../../libs/hooks/useMessage.jsx";
import useFormatter from "../../../libs/hooks/useFormatter.jsx";
import useChangeListener from "../../../libs/hooks/useChangeListener.jsx";
import {useEffect, useRef, useState} from "react";
import {pembelianInit, pembelianValidatorInit} from "../../../data/pembelian.js";
import useValidator from "../../../libs/hooks/useValidator.jsx";
import {itemInit, itemValidatorInit} from "../../../data/item.js";
import {paginationInit} from "../../../data/commons.js";
import {pembayaranInit, pembayaranValidatorInit} from "../../../data/pembayaran.js";
import {BASE_URL} from "../../../libs/config/settings.js";
import {Dialog} from "primereact/dialog";
import PropTypes from "prop-types";
import {PROP_TYPES} from "../settings.jsx";

const FormPembelian = ({ visible, setVisible }) => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const formatter = useFormatter()
  const onChangeListener = useChangeListener();

  const [pembelian, setPembelian] = useState(pembelianInit);
  const pembelianValidator = useValidator(pembelianValidatorInit);
  const tanggalref = useRef({value: ""})

  const [daftarItem, setDaftarItem] = useState([]);
  const [item, setItem] = useState(itemInit);
  const itemValidator = useValidator(itemValidatorInit)
  const [itemPaginate, setItemPaginate] = useState(paginationInit);

  const [pembayaran, setPembayaran] = useState(pembayaranInit)
  const pembayaranValidator = useValidator(pembayaranValidatorInit)


  const onPembelianDetail = async () => {
    try {
      const url = `${BASE_URL}/pembelian/${pembelian.id}/`;
      const config = {
        headers: {
          Authorization: jwt.get()
        }
      }
      const { data } = await http.privateHTTP.get(url, config)
      setPembelian(data);
      tanggalref.current.value = data.tanggal;

    } catch (error) {
      console.log(error)
      message.error(error)
    }
  }

  const onPembelianUpdate = (payload) => {
    pembelianValidator.reset();
    const url = `${BASE_URL}/pembelian/${pembelian.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }
    payload = {...pembelian, ...payload}
    http.privateHTTP.put(url, payload, config)
      .then((response) => {
        setPembelian(response.data);
        tanggalref.current.value = response.data.tanggal;
        onPembayaranDetail()
      })
      .catch((error) => {
        pembelianValidator.except(error)
        message.error(error)
      })
  }

  const onPembelianDelete = () => {
    message.confirmRemove(() => {
      const url = `${BASE_URL}/pembelian/${pembelian.id}/`;
      const config = {
        headers: {
          Authorization: jwt.get()
        }
      }

      http.privateHTTP.delete(url, config)
        .then((response) => {
          message.success(response)
          navigate(-1)
        })
        .catch((error) => {
          message.error(error)
        })
    })
  }

  const onPembelianPublish = () => {
    const url = `${BASE_URL}/pembelian/${pembelian.id}/publish/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.post(url, null, config)
      .then((response) => {
        message.success(response)
        navigate(-1)
      })
      .catch((error) => {
        message.error(error)
      })
  }

  const callbackWidgetSupplierChoice = (value) => {
    if (pembelian.is_draft) {
      onPembelianUpdate({supplier: value.id})
    }
  }

  const onPembelianUpdateTanggal = (e) => {
    onPembelianUpdate({tanggal: e.target.value})
  }

  // useEffect(() => {
  //   if (state.id) {
  //     onPembelianDetail()
  //   }
  // }, [state.id])

  const onItemList = (url, params) => {
    url = url ? url : `${BASE_URL}/pembelian/${pembelian.id}/items/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      },
      params
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        const {results, ...pagination} = response.data;
        setDaftarItem(results);
        setItemPaginate(pagination);
      })
      .catch((error) => {
        message.error(error)
      })
  }

  const onItemFilter = (params) => {
    onItemList(null, params);
  }

  const onItemPaginate = (url) => {
    onItemList(url)
  }

  const onItemCreate = (payload) => {
    const url = `${BASE_URL}/pembelian/${pembelian.id}/items/`;
    const config = {
      headers: {
        Authorization: jwt.get(),
      }
    }

    http.privateHTTP.post(url, payload, config)
      .then((response) => {
        message.success(response);
        onItemList()
        onPembelianDetail();
        onPembayaranDetail();
      })
      .catch((error) => {
        message.error(error);
      })
  }

  const onItemUpdate = () => {
    const url = `${BASE_URL}/pembelian/${pembelian.id}/items/${item.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.put(url, item, config)
      .then(() => {
        onItemList()
        setItem(itemInit);
        onPembayaranDetail()
      })
      .catch((error) => {
        message.error(error)
        itemValidator.except(error);
      })
  }

  const onItemDelete = () => {
    const url = `${BASE_URL}/pembelian/${pembelian.id}/items/${item.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.delete(url, config)
      .then(() => {
        onItemList()
        setItem(itemInit);
        onPembayaranDetail()
        onPembelianDetail()
      })
      .catch((error) => {
        message.error(error)
      })
  }

  const callbackWidgetBarangChoice = (value) => {
    const payload = {
      barang: value.id,
      diskon: 0,
      harga: value.harga_beli,
      quantity: 1,
    }

    onItemCreate(payload)
  }

  // useEffect(() => {
  //   if (state.id) {
  //     onItemList()
  //   }
  // }, [state.id])


  const onPembayaranDetail = () => {
    const url = `${BASE_URL}/pembelian/${pembelian.id}/pembayaran/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        setPembayaran(response.data)
      })
      .catch((error) => {
        message.error(error)
      })
  }

  const onPembayaranUpdate = () => {
    pembayaranValidator.reset();
    const url = `${BASE_URL}/pembelian/${pembelian.id}/pembayaran/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.put(url, pembayaran, config)
      .then((response) => {
        setPembayaran(response.data)
        onPembelianDetail()
      })
      .catch((error) => {
        message.error(error)
        pembayaranValidator.except(error);
      })
  }

  // useEffect(() => {
  //   if (state.id) {
  //     onPembayaranDetail()
  //   }
  // }, [state.id]);

  return (
    <>
      <Dialog  visible={visible} onHide={() => setVisible(!visible)}>
        <p>Lorem</p>
      </Dialog>
    </>
  )


}


FormPembelian.propTypes = PROP_TYPES
export default FormPembelian;