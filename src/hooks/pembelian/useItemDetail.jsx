import {useState} from "react";
import useValidator from "../../libs/hooks/useValidator.jsx";
import {BASE_URL} from "../../libs/config/settings.js";
import useHTTP from "../../libs/hooks/useHTTP.jsx";
import useJWT from "../../libs/hooks/useJWT.jsx";
import useMessage from "../../libs/hooks/useMessage.jsx";
import useFormatter from "../../libs/hooks/useFormatter.jsx";
import useChangeListener from "../../libs/hooks/useChangeListener.jsx";

const itemInit = {
  id: null,
  barang: null,
  harga: 0,
  diskon: 0,
  quantity: 0,
  total: 0,
  harga_diskon: 0,
  nomor_barang: "",
  nama_barang: "",
  jenis: "",
  satuan: "",
  stok_barang: 0,
  saldo: 0
}

const itemValidatorInit = {
  harga: [],
  diskon: [],
  quantity: []
}


const useItemDetail = (id, itemId) => {
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const formatter = useFormatter()
  const onChangeListener = useChangeListener();

  const [item, setItem] = useState(itemInit)
  const itemValidator = useValidator(itemValidatorInit);

  const onItemUpdate = (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    itemValidator.reset();
    const url = `${BASE_URL}/pembelian/${id}/items/${itemId}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.put(url, item, config).then((response) => {
      message.success(response)
    }).catch((error) => {
      message.error(error);
      itemValidator.except(error)
    })

  }

  const onItemDelete = () => {
    message.confirmRemove(() => {
      const url = `${BASE_URL}/pembelian/${id}/items/${itemId}/`;
      const config = {
        headers: {
          Authorization: jwt.get()
        }
      }

      http.privateHTTP.delete(url, config).then((response) => {
        message.success(response)
        setItem(itemInit)
      }).catch((error) => {
        message.error(error);
      })
    })
  }

  return {
    item,
    setItem,

  }
}

export default useItemDetail