import PropTypes from "prop-types";

export const PROP_TYPES = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func
}

export const PAGINATION_INIT = {
  next: null,
  previous: null,
  count: 0
}

export const BARANG = {
  id: "",
  nomor: "",
  nama: "",
  jenis: "",
  satuan: "",
  harga_beli: 0,
  harga_jual: 0,
  stok: 0,
}

export const BARANG_VALIDATOR = {
  nomor: [],
  nama: [],
  jenis: [],
  satuan: [],
  harga_beli: [],
  harga_jual: [],
  stok: [],
}

export const SUPPLIER = {
  id: "",
  nomor: "",
  nama: "",
  alamat: "",
  telepon: "",
  contact_person: "",
  bank: "",
  rekening: ""
}

export const SUPPLIER_VALIDATOR = {
  nomor: [],
  nama: [],
  alamat: [],
  telepon: [],
  contact_person: [],
  bank: [],
  rekening: []
}

export const USER = {
  username: "",
  password: ""
}

export const USER_VALIDATOR = {
  username: [],
  password: []
}

export const PEMBELIAN = {
  id: null,
  nomor: "",
  tanggal: "",
  supplier: null,
  user: null,
  is_draft: null,
  nama_supplier: "",
  nomor_supplier: "",
  pembayaran_lunas: null,
  jumlah_barang: 0,
  metode_pembayaran: "",
}

export const PEMBELIAN_VALIDATOR = {
  tanggal: [],
  supplier: []
}

export const ITEM = {
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

export const ITEM_VALIDATOR = {
  harga: [],
  diskon: [],
  quantity: []
}