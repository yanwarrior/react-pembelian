import {BARANG, BARANG_VALIDATOR, PAGINATION_INIT, PROP_TYPES} from "../settings.jsx";
import useHTTP from "../../../libs/hooks/useHTTP.jsx";
import useJWT from "../../../libs/hooks/useJWT.jsx";
import useMessage from "../../../libs/hooks/useMessage.jsx";
import useFormatter from "../../../libs/hooks/useFormatter.jsx";
import {useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {BASE_URL, CURRENCY, LOCALE} from "../../../libs/config/settings.js";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button"
import useValidator from "../../../libs/hooks/useValidator.jsx";
import useChangeListener from "../../../libs/hooks/useChangeListener.jsx";
import {InputNumber} from "primereact/inputnumber";
import PrimeWidgetPagination from "../../primes/widgets/PrimeWidgetPagination.jsx";
import PrimeWidgetSearch from "../../primes/widgets/PrimeWidgetSearch.jsx";
import {Fieldset} from "primereact/fieldset";
import PrimeWidgetValidationMessage from "../../primes/widgets/PrimeWidgetValidationMessage.jsx";
import PrimeWidgetBarcode from "../../primes/widgets/PrimeWidgetBarcode.jsx";

const FormBarang = ({ visible, setVisible }) => {
  const http = useHTTP()
  const jwt = useJWT();
  const message = useMessage();
  const formatter = useFormatter();
  const changeListener = useChangeListener();

  const [daftarBarang, setDaftarBarang] = useState([]);
  const [paginateBarang, setPaginateBarang] = useState(PAGINATION_INIT);
  const [barang, setBarang] = useState(BARANG);
  const barangValidator = useValidator(BARANG_VALIDATOR);

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

  const onBarangCreate = () => {
    barangValidator.reset();
    const url = `${BASE_URL}/barang/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.post(url, barang, config)
      .then((response) => {
        message.success(response);
        setBarang(BARANG)
        onBarangList()
      })
      .catch((error) => {
        message.error(error);
        barangValidator.except(error);
      })
  }

  const onBarangSearch = (e) => {
    if (e.key === 'Enter') {
      onBarangList(null, {search: e.target.value})
    }
  }

  const onBarangPaginate = (isPrev) => {
    const url = isPrev ? paginateBarang.previous : paginateBarang.next
    onBarangList(url);
  }

  const onBarangUpdate = () => {
    barangValidator.reset();
    const url = `${BASE_URL}/barang/${barang.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.put(url, barang, config)
      .then((response) => {
        message.success(response);
        setBarang(BARANG)
        onBarangList()
      })
      .catch((error) => {
        message.error(error);
        barangValidator.except(error);
      })
  }

  const onBarangDelete = () => {
    barangValidator.reset();
    message.confirmRemove(() => {
      const url = `${BASE_URL}/barang/${barang.id}/`;
      const config = {
        headers: {
          Authorization: jwt.get()
        }
      }

      http.privateHTTP.delete(url, config)
        .then((response) => {
          message.success(response);
          setBarang(BARANG)
          onBarangList()
        })
        .catch((error) => {
          message.error(error);
        })
    })
  }

  useEffect(() => {
    if (visible) {
      onBarangList();
    }
  }, [visible]);

  return (
    <>
      <Dialog
        maximizable={true}
        resizable={true}
        header={"Barang"}
        visible={visible}
        onHide={() => setVisible(!visible)}
      >
        <Fieldset legend={"Form Barang"} className={"mb-3"}>
          <div className={"formgrid grid"}>
            <div className="field col">
              <PrimeWidgetBarcode value={barang.nomor || "BRG-XXXX"}/>
            </div>
          </div>
          <div className={"formgrid grid"}>
            <div className="field col">
              <label>Nomor</label>
              <InputText
                disabled={barang.id}
                name={'nomor'}
                value={barang.nomor}
                onChange={(e) => changeListener.onChangeText(e, barang, setBarang)}
                className={`w-full ${barangValidator.primeInvalidField('nomor')}`}
              />
              <PrimeWidgetValidationMessage messages={barangValidator.get('nomor')}/>
            </div>
            <div className="field col">
              <label>Nama</label>
              <InputText
                name={'nama'}
                value={barang.nama}
                onChange={(e) => changeListener.onChangeText(e, barang, setBarang)}
                className={`w-full ${barangValidator.primeInvalidField('nama')}`}
              />
              <PrimeWidgetValidationMessage messages={barangValidator.get('nama')}/>
            </div>
            <div className="field col">
              <label>Jenis</label>
              <InputText
                name={'jenis'}
                value={barang.jenis}
                onChange={(e) => changeListener.onChangeText(e, barang, setBarang)}
                className={`w-full ${barangValidator.primeInvalidField('jenis')}`}
              />
              <PrimeWidgetValidationMessage messages={barangValidator.get('jenis')}/>
            </div>
            <div className="field col">
              <label>Satuan</label>
              <InputText
                name={'satuan'}
                value={barang.satuan}
                onChange={(e) => changeListener.onChangeText(e, barang, setBarang)}
                className={`w-full ${barangValidator.primeInvalidField('satuan')}`}
              />
              <PrimeWidgetValidationMessage messages={barangValidator.get('satuan')}/>
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label>Harga Beli</label>
              <InputNumber
                locale={LOCALE}
                currency={CURRENCY}
                value={barang.harga_beli}
                mode="currency"
                onChange={(e) => changeListener.changeNumber('harga_beli', e.value, barang, setBarang)}
                className={`w-full ${barangValidator.primeInvalidField('harga_beli')}`}
              />
              <PrimeWidgetValidationMessage messages={barangValidator.get('harga_beli')}/>
            </div>
            <div className="field col">
              <label>Harga Jual</label>
              <InputNumber
                locale={LOCALE}
                currency={CURRENCY}
                value={barang.harga_jual}
                mode="currency"
                onChange={(e) => changeListener.changeNumber('harga_jual', e.value, barang, setBarang)}
                className={`w-full ${barangValidator.primeInvalidField('harga_jual')}`}
              />
              <PrimeWidgetValidationMessage messages={barangValidator.get('harga_jual')}/>
            </div>
            <div className="field col">
              <label>Stok</label>
              <InputNumber
                value={barang.stok}
                onChange={(e) => changeListener.changeNumber('stok', e.value, barang, setBarang)}
                className={`w-full ${barangValidator.primeInvalidField('stok')}`}
              />
              <PrimeWidgetValidationMessage messages={barangValidator.get('stok')}/>
            </div>
          </div>
          <div className="grid">
            {!barang.id && (
              <div className="col">
                <Button onClick={onBarangCreate}>
                  <span className="pi pi-save mr-2"></span> Simpan
                </Button>
              </div>
            )}
            {barang.id && (
              <div className="col flex gap-2">
                <Button onClick={onBarangDelete} outlined={true}>
                  <span className="pi pi-trash mr-2"></span> Hapus
                </Button>
                <Button onClick={() => {
                  barangValidator.reset();
                  setBarang(BARANG)
                }}
                        outlined={true}
                >
                  <span className="pi pi-times-circle mr-2"></span> Batal
                </Button>
                <Button onClick={onBarangUpdate} >
                  <span className="pi pi-save mr-2"></span> Simpan
                </Button>
              </div>
            )}
          </div>
        </Fieldset>
        <DataTable
          value={daftarBarang}
          showGridlines
          header={<PrimeWidgetSearch callback={onBarangSearch} className={"w-7"}/>}
          footer={<PrimeWidgetPagination pagination={paginateBarang} callback={onBarangPaginate}/>}
          selectionMode={"single"}
          selection={barang}
          onSelectionChange={(e) => {
            setBarang(e.value);
            barangValidator.reset()
          }}
          dataKey={"id"}
        >
          <Column field={"nomor"} header={"Nomor"}></Column>
          <Column field={"jenis"} header={"Jenis"}></Column>
          <Column field={"satuan"} header={"Satuan"}></Column>
          <Column field={"harga_beli"} header={"Harga Beli"}
                  body={(value) => formatter.formatCurrency(value.harga_beli)}></Column>
          <Column field={"harga_jual"} header={"Harga Jual"}
                  body={(value) => formatter.formatCurrency(value.harga_jual)}></Column>
          <Column field={"stok"} header={"Stok"}></Column>
        </DataTable>
      </Dialog>
    </>
  )
}

FormBarang.propTypes = PROP_TYPES

export default FormBarang