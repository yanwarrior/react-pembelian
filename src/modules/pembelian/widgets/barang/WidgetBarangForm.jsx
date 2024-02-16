import PropTypes from "prop-types";
import PrimeWidgetBarcode from "../../../primes/widgets/PrimeWidgetBarcode.jsx";
import {InputText} from "primereact/inputtext";
import PrimeWidgetValidationMessage from "../../../primes/widgets/PrimeWidgetValidationMessage.jsx";
import {InputNumber} from "primereact/inputnumber";
import {CURRENCY, LOCALE} from "../../../../libs/config/settings.js";
import {Button} from "primereact/button";
import {Fieldset} from "primereact/fieldset";

const WidgetBarangForm = ({ barang }) => {
  if (!barang) {
    return null
  }
  return (
    <>
      <Fieldset legend={"Form Barang"} className={"mb-3"}>
        <div className={"formgrid grid"}>
          <div className="field col">
            <PrimeWidgetBarcode value={barang.data.state.nomor || "BRG-XXXX"}/>
          </div>
        </div>
        <div className={"formgrid grid"}>
          <div className="field col">
            <label>Nomor</label>
            <InputText
              disabled={barang.data.state.id}
              value={barang.data.state.nomor}
              onChange={(e) => barang.module.changeListener.change("nomor", e.target.value, barang)}
              className={`w-full ${barang.data.validator.primeInvalidField('nomor')}`}
            />
            <PrimeWidgetValidationMessage messages={barang.data.validator.get('nomor')}/>
          </div>
          <div className="field col">
            <label>Nama</label>
            <InputText
              value={barang.data.state.nama}
              onChange={(e) => barang.module.changeListener.change("nama", e.target.value, barang)}
              className={`w-full ${barang.data.validator.primeInvalidField('nama')}`}
            />
            <PrimeWidgetValidationMessage messages={barang.data.validator.get('nama')}/>
          </div>
          <div className="field col">
            <label>Jenis</label>
            <InputText
              value={barang.data.state.jenis}
              onChange={(e) => barang.module.changeListener.change("jenis", e.target.value, barang)}
              className={`w-full ${barang.data.validator.primeInvalidField('jenis')}`}
            />
            <PrimeWidgetValidationMessage messages={barang.data.validator.get('jenis')}/>
          </div>
          <div className="field col">
            <label>Satuan</label>
            <InputText
              value={barang.data.state.satuan}
              onChange={(e) => barang.module.changeListener.change("satuan", e.target.value, barang)}
              className={`w-full ${barang.data.validator.primeInvalidField('satuan')}`}
            />
            <PrimeWidgetValidationMessage messages={barang.data.validator.get('satuan')}/>
          </div>
        </div>
        <div className="formgrid grid">
          <div className="field col">
            <label>Harga Beli</label>
            <InputNumber
              locale={LOCALE}
              currency={CURRENCY}
              value={barang.data.state.harga_beli}
              mode="currency"
              onChange={(e) => barang.module.changeListener.change('harga_beli', e.value, barang, barang, true)}
              className={`w-full ${barang.data.validator.primeInvalidField('harga_beli')}`}
            />
            <PrimeWidgetValidationMessage messages={barang.data.validator.get('harga_beli')}/>
          </div>
          <div className="field col">
            <label>Harga Jual</label>
            <InputNumber
              locale={LOCALE}
              currency={CURRENCY}
              value={barang.data.state.harga_jual}
              mode="currency"
              onChange={(e) => barang.module.changeListener.change('harga_jual', e.value, barang, true)}
              className={`w-full ${barang.data.validator.primeInvalidField('harga_jual')}`}
            />
            <PrimeWidgetValidationMessage messages={barang.data.validator.get('harga_jual')}/>
          </div>
          <div className="field col">
            <label>Stok</label>
            <InputNumber
              value={barang.data.state.stok}
              onChange={(e) => barang.module.changeListener.change('stok', e.value, barang, true)}
              className={`w-full ${barang.data.validator.primeInvalidField('stok')}`}
            />
            <PrimeWidgetValidationMessage messages={barang.data.validator.get('stok')}/>
          </div>
        </div>
        <div className="grid">
          {!barang.data.isDetail && (
            <div className="col">
              <Button onClick={barang.behaviors.create}>
                <span className="pi pi-save mr-2"></span> Simpan
              </Button>
            </div>
          )}
          {barang.data.isDetail && (
            <div className="col flex gap-2">
              <Button onClick={barang.behaviors.remove} outlined={true}>
                <span className="pi pi-trash mr-2"></span> Hapus
              </Button>
              <Button onClick={() => {
                barang.data.validator.reset();
                barang.behaviors.resetState();
              }} outlined={true}>
                <span className="pi pi-times-circle mr-2"></span> Batal
              </Button>
              <Button onClick={barang.behaviors.update} >
                <span className="pi pi-save mr-2"></span> Simpan
              </Button>
            </div>
          )}
        </div>
      </Fieldset>
    </>
  )
}

WidgetBarangForm.propTypes = {
  barang: PropTypes.object
}

export default WidgetBarangForm;