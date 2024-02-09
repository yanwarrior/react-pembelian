import {Dock} from "primereact/dock";
import {useState} from "react";
import FormPembelian from "./forms/FormPembelian.jsx";
import FormBarang from "./forms/FormBarang.jsx";
import BarangLogo from "../../assets/pembelian/barang.svg"
import SupplierIcon from "../../assets/pembelian/supplier.svg"
import PembelianIcon from "../../assets/pembelian/pembelian.svg"
import HutangIcon from "../../assets/pembelian/hutang.svg"
import FormSupplier from "./forms/FormSupplier.jsx";
import formSupplier from "./forms/FormSupplier.jsx";

const Pembelian = () => {
  const [formPembelianDetail, setFormPembelianDetail] = useState(false);
  const [formBarang, setFormBarang] = useState(false);
  const [formSupplier, setFormSupplier] = useState(false);

  const items = [
    {
      label: 'Finder',
      icon: () => <img alt="Finder" src={BarangLogo} width="100%" />,
      command: () => setFormBarang(true)
    },
    {
      label: 'App Store',
      icon: () => <img alt="App Store" src={SupplierIcon} width="100%" />,
      command: () => setFormSupplier(true)
    },
    {
      label: 'Photos',
      icon: () => <img alt="Photos" src={PembelianIcon} width="100%" />,
    },
    {
      label: 'Trash',
      icon: () => <img alt="trash" src={HutangIcon} width="100%" />,
    }
  ];

  return (
    <>
      <FormPembelian visible={formPembelianDetail} setVisible={setFormPembelianDetail} />
      <FormBarang visible={formBarang} setVisible={setFormBarang} />
      <FormSupplier visible={formSupplier} setVisible={setFormSupplier} />
      <div className="card dock-demo">
        <div className="dock-window"
             style={{backgroundImage: 'url(https://primefaces.org/cdn/primereact/images/dock/window.jpg)'}}>
          <Dock model={items} position={"bottom"}/>
        </div>
      </div>
    </>
  )
}

export default Pembelian