import {BARANG, PAGINATION_INIT, PROP_TYPES, SUPPLIER, SUPPLIER_VALIDATOR} from "../settings.jsx";
import useHTTP from "../../../libs/hooks/useHTTP.jsx";
import useJWT from "../../../libs/hooks/useJWT.jsx";
import useMessage from "../../../libs/hooks/useMessage.jsx";
import useFormatter from "../../../libs/hooks/useFormatter.jsx";
import useChangeListener from "../../../libs/hooks/useChangeListener.jsx";
import {useEffect, useState} from "react";
import {BASE_URL} from "../../../libs/config/settings.js";
import useValidator from "../../../libs/hooks/useValidator.jsx";
import {Dialog} from "primereact/dialog";
import {Fieldset} from "primereact/fieldset";
import {InputText} from "primereact/inputtext";
import PrimeWidgetValidationMessage from "../../primes/widgets/PrimeWidgetValidationMessage.jsx";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import PrimeWidgetSearch from "../../primes/widgets/PrimeWidgetSearch.jsx";
import PrimeWidgetPagination from "../../primes/widgets/PrimeWidgetPagination.jsx";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";

const FormSupplier = ({ visible, setVisible }) => {
  const http = useHTTP()
  const jwt = useJWT();
  const message = useMessage();
  const formatter = useFormatter();
  const changeListener = useChangeListener();

  const [daftarSupplier, setDaftarSupplier] = useState([]);
  const [paginateSupplier, setPaginateSupplier] = useState(PAGINATION_INIT);
  const [supplier, setSupplier] = useState(SUPPLIER)
  const supplierValidator = useValidator(SUPPLIER_VALIDATOR)

  const onSupplierList = (url, params) => {
    url = url ? url : `${BASE_URL}/supplier/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      },
      params,
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        const {results, ...pagination} = response.data;
        setDaftarSupplier(results);
        setPaginateSupplier(pagination);
      })
      .catch((error) => {
        message.error(error);
      })
  }

  const onSupplierSearch = (e) => {
    if (e.key === 'Enter') {
      onSupplierList(null, {search: e.target.value})
    }
  }

  const onSupplierPaginate = (isPrev) => {
    const url = isPrev ? paginateSupplier.previous : paginateSupplier.next;
    onSupplierList(url);
  }

  const onSupplierCreate = () => {
    supplierValidator.reset();
    const url = `${BASE_URL}/supplier/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.post(url, supplier, config)
      .then((response) => {
        message.success(response);
        setSupplier(SUPPLIER);
        onSupplierList();
      })
      .catch((error) => {
        message.error(error);
        supplierValidator.except(error);
      })
  }

  const onSupplierUpdate = () => {
    supplierValidator.reset();
    const url = `${BASE_URL}/supplier/${supplier.id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.put(url, supplier, config)
      .then((response) => {
        message.success(response);
        setSupplier(SUPPLIER);
        onSupplierList();
      })
      .catch((error) => {
        message.error(error);
        supplierValidator.except(error);
      })
  }

  const onSupplierDetail = (id) => {
    supplierValidator.reset()
    const url = `${BASE_URL}/supplier/${id}/`;
    const config = {
      headers: {
        Authorization: jwt.get()
      }
    }

    http.privateHTTP.get(url, config)
      .then((response) => {
        setSupplier(response.data);
      })
      .catch((error) => {
        message.error(error);
      })
  }

  const onSupplierDelete = () => {
    supplierValidator.reset();
    message.confirmRemove(() => {
      const url = `${BASE_URL}/supplier/${supplier.id}/`;
      const config = {
        headers: {
          Authorization: jwt.get()
        }
      }

      http.privateHTTP.delete(url, config)
        .then((response) => {
          message.success(response)
          setSupplier(SUPPLIER);
          onSupplierList();
        })
        .catch((error) => {
          message.error(error);
        })
    })
  }

  useEffect(() => {
    if (visible) {
      onSupplierList()
    }
  }, [visible]);

  return (
    <>
      <Dialog
        maximizable={true}
        resizable={true}
        header={"Supplier"}
        visible={visible}
        onHide={() => setVisible(!visible)}
      >
        <Fieldset legend={"Form Supplier"} className={"mb-3"}>
          <div className={"formgrid grid"}>
            <div className="field col">
              <label>Nomor</label>
              <InputText
                disabled={supplier.id}
                value={supplier.nomor}
                onChange={(e) => changeListener.changeText('nomor', e.value, supplier, setSupplier)}
                className={`w-full ${supplierValidator.primeInvalidField('nomor')}`}
              />
              <PrimeWidgetValidationMessage messages={supplierValidator.get('nomor')}/>
            </div>
            <div className="field col">
              <label>Nama</label>
              <InputText
                value={supplier.nama}
                onChange={(e) => changeListener.changeText('nama', e.value, supplier, setSupplier)}
                className={`w-full ${supplierValidator.primeInvalidField('nama')}`}
              />
              <PrimeWidgetValidationMessage messages={supplierValidator.get('nama')}/>
            </div>
            <div className="field col">
              <label>Telepon</label>
              <InputText
                value={supplier.nama}
                onChange={(e) => changeListener.changeText('telepon', e.value, supplier, setSupplier)}
                className={`w-full ${supplierValidator.primeInvalidField('nama')}`}
              />
              <PrimeWidgetValidationMessage messages={supplierValidator.get('telepon')}/>
            </div>
          </div>
          <div className={"formgrid grid"}>
            <div className="field col">
              <label>Bank</label>
              <InputText
                value={supplier.bank}
                onChange={(e) => changeListener.changeText('bank', e.value, supplier, setSupplier)}
                className={`w-full ${supplierValidator.primeInvalidField('bank')}`}
              />
              <PrimeWidgetValidationMessage messages={supplierValidator.get('bank')}/>
            </div>
            <div className="field col">
              <label>Rekening</label>
              <InputText
                value={supplier.rekening}
                onChange={(e) => changeListener.changeText('rekening', e.value, supplier, setSupplier)}
                className={`w-full ${supplierValidator.primeInvalidField('rekening')}`}
              />
              <PrimeWidgetValidationMessage messages={supplierValidator.get('rekening')}/>
            </div>
            <div className="field col">
              <label>Contact Person</label>
              <InputText
                value={supplier.contact_person}
                onChange={(e) => changeListener.changeText('contact_person', e.value, supplier, setSupplier)}
                className={`w-full ${supplierValidator.primeInvalidField('contact_person')}`}
              />
              <PrimeWidgetValidationMessage messages={supplierValidator.get('contact_person')}/>
            </div>
          </div>
          <div className={"formgrid grid"}>
            <div className="field col">
              <label>Alamat</label>
              <InputTextarea
                value={supplier.alamat}
                onChange={(e) => changeListener.changeText('alamat', e.value, supplier, setSupplier)}
                className={`w-full ${supplierValidator.primeInvalidField('alamat')}`}
                cols={34}
              />
              <PrimeWidgetValidationMessage messages={supplierValidator.get('alamat')}/>
            </div>
          </div>
          <div className="grid">
            {!supplier.id && (
              <div className="col">
                <Button onClick={onSupplierCreate}>
                  <span className="pi pi-save mr-2"></span> Simpan
                </Button>
              </div>
            )}
            {supplier.id && (
              <div className="col flex gap-2">
                <Button onClick={onSupplierDelete} outlined={true}>
                  <span className="pi pi-trash mr-2"></span> Hapus
                </Button>
                <Button
                  onClick={() => {
                    supplierValidator.reset();
                    setSupplier(SUPPLIER)
                  }}
                  outlined={true}
                >
                  <span className="pi pi-times-circle mr-2"></span> Batal
                </Button>
                <Button onClick={onSupplierUpdate}>
                  <span className="pi pi-save mr-2"></span> Simpan
                </Button>
              </div>
            )}
          </div>
        </Fieldset>
        <DataTable
          value={daftarSupplier}
          showGridlines
          header={<PrimeWidgetSearch callback={onSupplierSearch} className={"w-7"}/>}
          footer={<PrimeWidgetPagination pagination={paginateSupplier} callback={onSupplierPaginate}/>}
          selectionMode={"single"}
          selection={supplier}
          onSelectionChange={(e) => {
            onSupplierDetail(e.value.id)
          }}
          dataKey={"id"}
        >
          <Column field={"nomor"} header={"Nomor"}></Column>
          <Column field={"nama"} header={"Nama"}></Column>
          <Column field={"telepon"} header={"Telepon"}></Column>
          <Column field={"alamat"} header={"Alamat"}></Column>
          <Column field={"contact_person"} header={"Contact Person"}></Column>
          <Column field={"bank"} header={"Bank"}></Column>
          <Column field={"rekening"} header={"Rekening"}></Column>
        </DataTable>
      </Dialog>

    </>
  )
}

FormSupplier.propTypes = PROP_TYPES;

export default FormSupplier;