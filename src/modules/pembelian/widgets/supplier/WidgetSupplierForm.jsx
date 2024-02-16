import {InputText} from "primereact/inputtext";
import PrimeWidgetValidationMessage from "../../../primes/widgets/PrimeWidgetValidationMessage.jsx";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {Fieldset} from "primereact/fieldset";
import PropTypes from "prop-types";

const WidgetSupplierForm = ({ supplier }) => {
  if (!supplier) {
    return null;
  }

  return (
    <>
      <Fieldset legend={"Form Supplier"} className={"mb-3"}>
        <div className={"formgrid grid"}>
          <div className="field col">
            <label>Nomor</label>
            <InputText
              disabled={supplier.data.isDetail}
              value={supplier.data.state.nomor}
              onChange={(e) => supplier.module.changeListener.change('nomor', e.target.value, supplier)}
              className={`w-full ${supplier.data.validator.primeInvalidField('nomor')}`}
            />
            <PrimeWidgetValidationMessage messages={supplier.data.validator.get('nomor')}/>
          </div>
          <div className="field col">
            <label>Nama</label>
            <InputText
              value={supplier.data.state.nama}
              onChange={(e) => supplier.module.changeListener.change('nama', e.target.value, supplier)}
              className={`w-full ${supplier.data.validator.primeInvalidField('nama')}`}
            />
            <PrimeWidgetValidationMessage messages={supplier.data.validator.get('nama')}/>
          </div>
          <div className="field col">
            <label>Telepon</label>
            <InputText
              value={supplier.data.state.telepon}
              onChange={(e) => supplier.module.changeListener.change('telepon', e.target.value, supplier)}
              className={`w-full ${supplier.data.validator.primeInvalidField('telepon')}`}
            />
            <PrimeWidgetValidationMessage messages={supplier.data.validator.get('telepon')}/>
          </div>
        </div>
        <div className={"formgrid grid"}>
          <div className="field col">
            <label>Bank</label>
            <InputText
              value={supplier.data.state.bank}
              onChange={(e) => supplier.module.changeListener.change('bank', e.target.value, supplier)}
              className={`w-full ${supplier.data.validator.primeInvalidField('bank')}`}
            />
            <PrimeWidgetValidationMessage messages={supplier.data.validator.get('bank')}/>
          </div>
          <div className="field col">
            <label>Rekening</label>
            <InputText
              value={supplier.data.state.rekening}
              onChange={(e) => supplier.module.changeListener.change('rekening', e.target.value, supplier)}
              className={`w-full ${supplier.data.validator.primeInvalidField('rekening')}`}
            />
            <PrimeWidgetValidationMessage messages={supplier.data.validator.get('rekening')}/>
          </div>
          <div className="field col">
            <label>Contact Person</label>
            <InputText
              value={supplier.data.state.contact_person}
              onChange={(e) => supplier.module.changeListener.change('contact_person', e.target.value, supplier)}
              className={`w-full ${supplier.data.validator.primeInvalidField('contact_person')}`}
            />
            <PrimeWidgetValidationMessage messages={supplier.data.validator.get('contact_person')}/>
          </div>
        </div>
        <div className={"formgrid grid"}>
          <div className="field col">
            <label>Alamat</label>
            <InputTextarea
              value={supplier.data.state.alamat}
              onChange={(e) => supplier.module.changeListener.change('alamat', e.target.value, supplier)}
              className={`w-full ${supplier.data.validator.primeInvalidField('alamat')}`}
              cols={34}
            />
            <PrimeWidgetValidationMessage messages={supplier.data.validator.get('alamat')}/>
          </div>
        </div>
        <div className="grid">
          {!supplier.data.isDetail && (
            <div className="col">
              <Button onClick={supplier.behaviors.create}>
                <span className="pi pi-save mr-2"></span> Simpan
              </Button>
            </div>
          )}
          {supplier.data.isDetail && (
            <div className="col flex gap-2">
              <Button onClick={supplier.behaviors.remove} outlined={true}>
                <span className="pi pi-trash mr-2"></span> Hapus
              </Button>
              <Button
                onClick={() => {
                  supplier.data.validator.reset();
                  supplier.behaviors.resetState();
                }}
                outlined={true}
              >
                <span className="pi pi-times-circle mr-2"></span> Batal
              </Button>
              <Button onClick={supplier.behaviors.update}>
                <span className="pi pi-save mr-2"></span> Simpan
              </Button>
            </div>
          )}
        </div>
      </Fieldset>
    </>
  )
}

WidgetSupplierForm.propTypes = {
  supplier: PropTypes.object
}

export default WidgetSupplierForm;