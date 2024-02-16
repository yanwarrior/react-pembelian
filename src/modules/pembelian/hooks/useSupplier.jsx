import {PAGINATION_INIT, SUPPLIER, SUPPLIER_VALIDATOR} from "../settings.jsx";
import useValidator from "../../../libs/hooks/useValidator.jsx";
import {useState} from "react";
import useModule from "../../../libs/hooks/useModule.jsx";

const useSupplier = () => {
  const module = useModule();

  const [collections, setCollections] = useState([]);
  const [paging, setPaging] = useState(PAGINATION_INIT);
  const [state, setState] = useState(SUPPLIER);
  const validator = useValidator(SUPPLIER_VALIDATOR);

  const resetState = () => {
    setState(SUPPLIER)
  }

  const resetCollection = () => {
    setCollections([]);
    setPaging(PAGINATION_INIT);
  }

  const resetAll = () => {
    resetState();
    resetCollection();
    validator.reset();
  }

  const all = async (url, params) => {
    try {
      url = url ? url : `${module.baseURL}/supplier/`;
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
      validator.reset()
      const url = `${module.baseURL}/supplier/${id}/`;
      const response = await module.http.privateHTTP.get(url, module.configHTTP());
      setState(response.data)
    } catch (error) {
      module.message.error(error);
    }
  }

  const create = async () => {
    try {
      validator.reset();
      const url = `${module.baseURL}/supplier/`;
      const response = await module.http.privateHTTP.post(url, state, module.configHTTP());
      module.message.success(response);
      resetState()
      all()
    } catch (error) {
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
      const url = `${module.baseURL}/supplier/${state.id}/`
      const response = await  module.http.privateHTTP.put(url, state, module.configHTTP());
      resetState()
      module.message.success(response);
      all()
    } catch (error) {
      module.message.error(error);
      validator.except(error);
    }
  }

  const remove = () => {
    module.message.confirmRemove(async () => {
      try {
        validator.reset();
        const url = `${module.baseURL}/supplier/${state.id}/`;
        const response = await module.http.privateHTTP.delete(url, module.configHTTP())
        module.message.success(response);
        resetState()
        all()
      } catch (error) {
        module.message.error(error);
      }
    })
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



export default useSupplier;