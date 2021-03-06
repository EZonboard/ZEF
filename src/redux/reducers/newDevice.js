const newDeviceReducer = (state = {
  site:{},
  breaker:{},
  serial: {},
  serial2:'',
  type: {},
  name: '',
  date: '',
  id: '',
}, action) => {
    switch (action.type) {
      case 'SET_DEVICE_SITE':
        state.site = action.payload;
        return state;
      case 'SET_BREAKER':
        state.breaker = action.payload;
        return state;
      case 'SET_SERIAL':
        state.serial = action.payload;
        return state;
      case 'SET_SERIAL2':
          state.serial2 = action.payload;
          return state;
      case 'SET_TYPE':
        state.type = action.payload;
        return state;
      case 'SET_NAME':
        state.name = action.payload;
        return state;
      case 'SET_DATE':
        state.date = action.payload;
        return state;
      case 'SET_ID':
          state.id = action.payload;
          return state;
      case 'CLEAR_DEVICE':
          return {
            site:{},
            breaker:{},
            serial: {},
            serial2: '',
            type: {},
            name: '',
            date: '',
            id: '',
          };
      default:
        return state;
    }
  };
  
  // newDevice will be on the redux state at:
  // state.device
  export default newDeviceReducer;