import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {ContextApplication} from "./libs/config/contexts.js";
import {HashRouter, Route, Routes} from "react-router-dom";
import Pembelian from "./modules/pembelian/Pembelian.jsx";
//
import OutletPage from "./outlets/OutletPage.jsx";
// import PageBarangList from "./pages/barang/PageBarangList.jsx";
// import PageBarangCreate from "./pages/barang/PageBarangCreate.jsx";
// import PageBarangDetail from "./pages/barang/PageBarangDetail.jsx";
// import PageSupplierList from "./pages/supplier/PageSupplierList.jsx";
// import PageSupplierCreate from "./pages/supplier/PageSupplierCreate.jsx";
// import PageSupplierDetail from "./pages/supplier/PageSupplierDetail.jsx";
// import PagePembelianList from "./pages/pembelian/PagePembelianList.jsx";
// import PagePembelianDetail from "./pages/pembelian/PagePembelianDetail.jsx";
// import PageHutangList from "./pages/pembelian/PageHutangList.jsx";
// import PageHutangDetail from "./pages/pembelian/PageHutangDetail.jsx";
import useLoading from "./libs/hooks/useLoading.jsx";
import PagePembelianOutlet from "./modules/pembelian/pages/PagePembelianOutlet.jsx";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const loading = useLoading();

  return (
    <>
      <ContextApplication.Provider value={{isAuthenticated, setIsAuthenticated, loading}}>
        <HashRouter>
          <Routes>
            <Route path={"/"} element={<PagePembelianOutlet />}>
              <Route index={true} element={<Pembelian />} />
            </Route>
            {/*<Route path={"/"} element={<OutletPage />}>*/}
            {/*  <Route index={true} element={<PageBarangList />} />*/}
            {/*  <Route path={"new"} element={<PageBarangCreate />} />*/}
            {/*  <Route path={"update"} element={<PageBarangDetail />} />*/}
            {/*</Route>*/}
            {/*<Route path={"/supplier"} element={<OutletPage />}>*/}
            {/*  <Route index={true} element={<PageSupplierList />} />*/}
            {/*  <Route path={"new"} element={<PageSupplierCreate />} />*/}
            {/*  <Route path={"update"} element={<PageSupplierDetail />} />*/}
            {/*</Route>*/}
            {/*<Route path={"/pembelian"} element={<OutletPage />}>*/}
            {/*  <Route index={true} element={<PagePembelianList />} />*/}
            {/*  <Route path={"detail"} element={<PagePembelianDetail />} />*/}
            {/*  <Route path={"hutang"} element={<PageHutangList />} />*/}
            {/*  <Route path={"hutang/detail"} element={<PageHutangDetail />} />*/}
            {/*</Route>*/}
          </Routes>
        </HashRouter>
      </ContextApplication.Provider>
    </>
  )
}

export default App
