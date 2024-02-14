import useModule from "../../../libs/hooks/useModule.jsx";
import {useState} from "react";
import {BARANG, BARANG_VALIDATOR, PAGINATION_INIT} from "../settings.jsx";
import useValidator from "../../../libs/hooks/useValidator.jsx";

const useBarang = () => {
  const module = useModule();

  const [collections, setCollections] = useState([]);
  const [paging, setPaging] = useState(PAGINATION_INIT);
  const [state, setState] = useState(BARANG);
  const validator = useValidator(BARANG_VALIDATOR);

  const resetState = () => {
    validator.reset();
    setState(BARANG)
  }

  const resetCollection = () => {
    setCollections([]);
    setPaging(PAGINATION_INIT);
  }


  const resetAll = () => {
    resetState();
    resetCollection();
  }

  const all = async (url, params) => {
    try {
      url = url ? url : `${module.baseURL}/barang/`;
      const response = await module.http.privateHTTP.get(url, module.configHTTP(params));
      const { results, ...pagination } = response.data
      setCollections(results);
      setPaging(pagination);
    } catch (error) {
      module.message.error(error);
    }
  }

  const get = async (id) => {
    try {
      const url = `${module.baseURL}/barang/${id}/`;
      const response = await module.http.privateHTTP.get(url, module.configHTTP());
      setState(response.data)
    } catch (error) {
      module.message.error(error);
    }
  }

  const create = async () => {
    try {
      validator.reset();
      const response = await module.http.privateHTTP.post(`${module.baseURL}/barang/`, state, module.configHTTP());
      module.message.success(response);
      resetState()
      all()
    } catch (error) {
      console.log(error)
      module.message.error(error);
      validator.except(error);
    }
  }

  const search = (e) => {
    if (e.key === 'Enter') {
      all(null, {search: e.target.value})
    }
  }

  const paginate = (isPrev) => {
    const url = isPrev ? paginate.previous : paginate.next
    all(url);
  }

  const update = async () => {
    try {
      validator.reset();
      const url = `${module.baseURL}/barang/${state.id}/`
      const response = await  module.http.privateHTTP.put(url, state, module.configHTTP());
      setState(BARANG);
      module.message.success(response);
      all()
    } catch (error) {
      module.message.error(error);
      validator.except(error);
    }
  }

  const remove = async () => {
    try {
      validator.reset();
      const url = `${module.baseURL}/barang/${state.id}/`;
      const response = await module.http.privateHTTP.delete(url, module.configHTTP())
      module.message.success(response);
      setState(BARANG)
      all()
    } catch (error) {
      module.message.error(error);
    }
  }

  const isDetail = () => Boolean(state.id);

  return {
    data : {
      collections,
      setCollections,
      paging,
      state,
      setState,
      validator,
      isDetail: isDetail(),
    },
    behaviors: {
      all,
      create,
      search,
      paginate,
      update,
      remove,
      resetAll,
      resetCollection,
      resetState,
      get
    },
    module,
  }
}

export default useBarang;