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
import FormSignIn from "./forms/FormSignIn.jsx";

const Pembelian = () => {
  const [formBarang, setFormBarang] = useState(false);
  const [formSupplier, setFormSupplier] = useState(false);
  const [formPembelian, setFormPembelian] = useState(false);

  const items = [
    {
      label: 'Barang',
      icon: () => <img alt="Finder" src={BarangLogo} width="100%" />,
      command: () => setFormBarang(true)
    },
    {
      label: 'Supplier',
      icon: () => <img alt="App Store" src={SupplierIcon} width="100%" />,
      command: () => setFormSupplier(true)
    },
    {
      label: 'Pembelian',
      icon: () => <img alt="Photos" src={PembelianIcon} width="100%" />,
      command: () => setFormPembelian(true)
    },
    {
      label: 'Hutang',
      icon: () => <img alt="trash" src={HutangIcon} width="100%" />,
    }
  ];

  return (
    <>
      <FormPembelian visible={formPembelian} setVisible={setFormPembelian} />
      <FormBarang visible={formBarang} setVisible={setFormBarang} />
      <FormSupplier visible={formSupplier} setVisible={setFormSupplier} />
      <FormSignIn />
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