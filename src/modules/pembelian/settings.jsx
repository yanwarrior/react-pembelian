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