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
import {BASE_URL, CURRENCY, LOCALE} from "../../../libs/config/settings.js";
import {Dialog} from "primereact/dialog";
import PropTypes from "prop-types";
import {ITEM, PROP_TYPES} from "../settings.jsx";
import {Fieldset} from "primereact/fieldset";
import PrimeWidgetBarcode from "../../primes/widgets/PrimeWidgetBarcode.jsx";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Calendar} from "primereact/calendar";
import {DataTable} from "primereact/datatable";
import PrimeWidgetSearch from "../../primes/widgets/PrimeWidgetSearch.jsx";
import {Column} from "primereact/column";
import WidgetPembelianChoice from "../widgets/WidgetPembelianChoice.jsx";
import WidgetSupplierChoice from "../widgets/WidgetSupplierChoice.jsx";
import {InputNumber} from "primereact/inputnumber";
import WidgetBarangChoice from "../widgets/WidgetBarangChoice.jsx";
import PrimeWidgetValidationMessage from "../../primes/widgets/PrimeWidgetValidationMessage.jsx";
import {Chip} from "primereact/chip";
import {Tag} from "primereact/tag";

const FormPembelian = ({ visible, setVisible }) => {
  const navigate = useNavigate();
  const http = useHTTP();
  const jwt = useJWT();
  const message = useMessage();
  const formatter = useFormatter()
  const changeListener = useChangeListener();

  const [pembelian, setPembelian] = useState(pembelianInit);
  const pembelianValidator = useValidator(pembelianValidatorInit);
  const tanggalref = useRef({value: ""})
  const [date, setDate] = useState(null);

  const [daftarItem, setDaftarItem] = useState([]);
  const [item, setItem] = useState(itemInit);
  const itemValidator = useValidator(itemValidatorInit)
  const [itemPaginate, setItemPaginate] = useState(paginationInit);

  const [pembayaran, setPembayaran] = useState(pembayaranInit)
  const pembayaranValidator = useValidator(pembayaranValidatorInit)

  const appRef = useRef(0)
  const pembayaranRef = useRef(0)
  const itemRef = useRef(0);

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
    } catch (error) {
      console.log(error)
      message.error(error)
    }
  }

  const onPembelianCreate = () => {
    const url = `${BASE_URL}/pembelian/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.post(url, null, config)
      .then((response) => {
        setPembelian(response.data)
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => appRef.current += 1)
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
      })
      .catch((error) => {
        pembelianValidator.except(error)
        message.error(error)
      })
      .finally(() => appRef.current += 1)
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
        })
        .catch((error) => {
          message.error(error)
        })
        .finally(() => appRef.current += 1)
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
      })
      .catch((error) => {
        message.error(error)
      })
      .finally(() => appRef.current += 1)
  }

  const callbackWidgetSupplierChoice = (value) => {
    if (pembelian.is_draft) {
      onPembelianUpdate({supplier: value.id})
    }
  }

  const onCallbackWidgetPembelianChoice = (value) => {
    console.log(Date.parse(value.tanggal))
    appRef.current += 1;
    setDate(new Date(Date.parse(value.tanggal)))
    setPembelian(value);
  }

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
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => appRef.current += 1)
  }

  const onItemUpdate = (payload) => {
    const url = `${BASE_URL}/pembelian/${pembelian.id}/items/${payload.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }
    payload = {...item, ...payload}
    http.privateHTTP.put(url, payload, config)
      .then((response) => {
        setItem(response.data)
      })
      .catch((error) => {
        message.error(error)
        itemValidator.except(error);
      })
      .finally(() => appRef.current += 1)
  }

  const onItemDelete = (id) => {
    const url = `${BASE_URL}/pembelian/${pembelian.id}/items/${id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.delete(url, config)
      .then(() => {
        onItemList()
      })
      .catch((error) => {
        message.error(error)
      })
      .finally(() => appRef.current += 1)
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
    // payload = {...pembayaran, ...payload}
    http.privateHTTP.put(url, pembayaran, config)
      .then((response) => {
        setPembayaran(response.data)
      })
      .catch((error) => {
        message.error(error)
        pembayaranValidator.except(error);
      })
      .finally(() => appRef.current += 1)
  }

  useEffect(() => {
    if (appRef.current > 0) {
      appRef.current = 0;
      onItemList()
      onPembayaranDetail();
      onPembelianDetail();
    }
  }, [appRef.current]);


  return (
    <>
      <Dialog
        maximizable={true}
        maximized={true}
        resizable={true}
        header={(
          <div className={"flex gap-2 mb-3"}>
            <span>Pembelian</span>
            <Tag value={`Dibayar ${formatter.formatCurrency(pembayaran.dibayar)}`} />
            <Tag value={`Sisa ${formatter.formatCurrency(pembayaran.sisa)}`} />
            <Tag value={`Kembali ${formatter.formatCurrency(pembayaran.kembali)}`} />
            <Tag value={`Total ${formatter.formatCurrency(pembayaran.total)}`} />
            <Tag value={`${pembelian.is_draft ? 'Draft' : 'Published'}`} />
            {pembayaran.metode === 'kredit' && (
              <>
                <Tag value={`Tempo ${pembayaran.tempo} hari`} />
                <Tag value={`Jatuh Tempo: ${formatter.formatDate(pembayaran.jatuh_tempo)}`} />
              </>
            )}
          </div>
        )}
        visible={visible}
        onHide={() => setVisible(!visible)}
        footer={() => (
          <>
            <Button disabled={!pembelian.is_draft} onClick={onPembelianPublish}>Publish</Button>
          </>
        )}
      >
        <Fieldset legend={"Detail Pembelian"} className={"mb-3"}>
          <div className="formgrid grid">
            <div className="field col">
              <label>Nomor</label>
              <div className="p-inputgroup flex-1 w-full">
                <Button onClick={onPembelianCreate}>Baru</Button>
                <InputText
                  disabled={pembelian.id}
                  value={pembelian.nomor}
                  onChange={(e) => changeListener.changeText('nomor', e.target.value, pembelian, setPembelian)}
                  className={`${pembelianValidator.primeInvalidField('nomor')}`}
                />
                <WidgetPembelianChoice callback={onCallbackWidgetPembelianChoice} />
              </div>
            </div>
            <div className="field col">
              <label>Tanggal</label>
              <Calendar
                value={new Date(Date.parse(pembelian.tanggal))}
                onChange={(e) => onPembelianUpdate({tanggal: e.value.toISOString()})}
                className={`w-full ${pembelianValidator.primeInvalidField('tanggal')}`}
              />
              <PrimeWidgetValidationMessage messages={pembelianValidator.get('tanggal')} />
            </div>
            <div className="field col">
              <label>Nama Supplier</label>
              <InputText
                disabled={true}
                readOnly={true}
                value={pembelian.nama_supplier}
                className={"w-full"}
              />
            </div>
            <div className="field col">
              <label>Nomor Supplier</label>
              <div className="p-inputgroup flex-1 w-full">
                <InputText
                  disabled={true}
                  readOnly={true}
                  value={pembelian.nomor_supplier}
                  className={`${pembelianValidator.primeInvalidField('nomor')}`}
                />
                <WidgetSupplierChoice callback={callbackWidgetSupplierChoice} />
              </div>
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label>Status Pembelian</label>
              <InputText
                disabled={true}
                readOnly={true}
                value={pembelian.pembayaran_lunas ? "Lunas" : "Belum Lunas"}
                className={"w-full"}
              />
            </div>
            <div className="field col">
              <label>Pembayaran</label>
              <InputText
                disabled={true}
                readOnly={true}
                value={pembelian.metode_pembayaran}
                className={"w-full"}
              />
            </div>
            <div className="field col">
              <label>Jumlah Barang</label>
              <InputText
                disabled={true}
                readOnly={true}
                value={pembelian.jumlah_barang}
                className={"w-full"}
              />
            </div>
          </div>
        </Fieldset>
        <DataTable
          value={daftarItem}
          showGridlines={true}
          header={(
            <div className="flex justify-content-between">
              <PrimeWidgetSearch callback={() => {}} className={"w-7"} />
              <WidgetBarangChoice callback={callbackWidgetBarangChoice} />
            </div>
          )}
          editMode="row"
          dataKey="id"
          onRowEditComplete={(e) => { onItemUpdate(e.newData)}}
        >
          <Column field={"nama_barang"} header={"Nama"}></Column>
          <Column field={"satuan"} header={"Satuan"}></Column>
          <Column field={"jenis"} header={"Jenis"}></Column>
          <Column
            field={"harga"}
            header={"Harga"}
            editor={(options) => (
              <InputNumber
                locale={LOCALE}
                currency={CURRENCY}
                mode="currency"
                value={options.value}
                onValueChange={(e) => options.editorCallback(e.value)}
              />
            )}
          ></Column>
          <Column
            field={"diskon"}
            header={"Diskon"}
            editor={(options) => (
              <InputNumber
                value={options.value}
                onValueChange={(e) => options.editorCallback(e.value)}
              />
            )}
          ></Column>
          <Column
            field={"quantity"}
            header={"Quantity"}
            editor={(options) => (
              <InputNumber
                value={options.value}
                onValueChange={(e) => options.editorCallback(e.value)}
              />
            )}
          ></Column>
          <Column field={"stok_barang"} header={"Stok"}></Column>
          <Column field={"saldo"} header={"Saldo"}></Column>
          <Column field={"total"} header={"Total"}></Column>
          <Column rowEditor={() => pembelian.is_draft} bodyStyle={{ textAlign: 'center' }}></Column>
        </DataTable>
        <Fieldset legend={"Detail Pembayaran"} className={"mb-3 mt-4"}>
          <div className="formgrid grid">
            <div className="field col">
              <label>Total</label>
              <InputNumber
                disabled={true}
                readOnly={true}
                locale={LOCALE}
                currency={CURRENCY}
                mode="currency"
                value={pembayaran.total}
                className={"w-full"}
              />
            </div>
            <div className="field col">
              <label>Kembali</label>
              <InputNumber
                disabled={true}
                readOnly={true}
                locale={LOCALE}
                currency={CURRENCY}
                mode="currency"
                value={pembayaran.kembali}
                className={"w-full"}
              />
            </div>
            <div className="field col">
              <label>Sisa</label>
              <InputNumber
                disabled={true}
                readOnly={true}
                locale={LOCALE}
                currency={CURRENCY}
                mode="currency"
                value={pembayaran.sisa}
                className={"w-full"}
              />
            </div>
          </div>

          <div className="formgrid grid">

            <div className="field col">
              <label>PPN %</label>
              <InputNumber
                value={pembayaran.ppn}
                onChange={(e) => changeListener.changeNumber('ppn', e.value, pembayaran, setPembayaran)}
                className={`w-full ${pembelianValidator.primeInvalidField('ppn')}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onPembayaranUpdate();
                  }
                }}
              />
            </div>
            <div className="field col">
              <label>Diskon %</label>
              <InputNumber
                value={pembayaran.diskon}
                onChange={(e) => changeListener.changeNumber('diskon', e.value, pembayaran, setPembayaran)}
                className={`w-full ${pembelianValidator.primeInvalidField('diskon')}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onPembayaranUpdate();
                  }
                }}
              />
            </div>
            <div className="field col">
              <label>Dibayar</label>
              <InputNumber
                locale={LOCALE}
                currency={CURRENCY}
                mode="currency"
                value={pembayaran.dibayar}
                onChange={(e) => {
                  changeListener.changeNumber('dibayar', e.value, pembayaran, setPembayaran)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onPembayaranUpdate();
                  }
                }}
                className={`w-full ${pembelianValidator.primeInvalidField('dibayar')}`}
              />
            </div>
            {pembayaran.metode === 'kredit' && (
              <>
                <div className="field col">
                  <label>Tempo Pembayaran (hari)</label>
                  <InputNumber
                    value={pembayaran.tempo}
                    onChange={(e) => changeListener.changeNumber('tempo', e.value, pembayaran, setPembayaran)}
                    className={`w-full ${pembelianValidator.primeInvalidField('tempo')}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onPembayaranUpdate();
                      }
                    }}
                  />
                </div>
                <div className="field col">
                  <label>Jatuh Tempo</label>
                  <InputText
                    disabled={true}
                    readOnly={true}
                    value={formatter.formatDate(pembayaran.jatuh_tempo)}
                    className={"w-full"}
                  />
                </div>
              </>
            )}
          </div>
        </Fieldset>

      </Dialog>
    </>
  )


}


FormPembelian.propTypes = PROP_TYPES
export default FormPembelian;