
const useChangeListener = () => {

  const onChangeText = (e, getter, setter) => {
    const name = e.target.name;
    const value = e.target.value;

    setter({...getter, [name]: value})
  }

  const onChangeNumber = (e, getter, setter) => {
    const name = e.target.name;
    const value = e.target.value;
    setter({...getter, [name]: Number(value).toString()})
  }

  const changeText = (field, value, state, setState) => {
    setState({...state, [field]: value})
  }

  const changeNumber = (field, value, state, setState, decimal=false) => {
    if (decimal) {
      setState({...state, [field]: parseInt(Number(value).toString())})
    } else {
      setState({...state, [field]: parseFloat(Number(value).toString())})
    }
  }

  return {onChangeText, onChangeNumber, changeText, changeNumber}
}

export default useChangeListener;