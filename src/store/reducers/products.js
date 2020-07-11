const products = (state = { list: [], page_num: 1, total: 0 }, action) => {
  switch (action.type) {
    case "PRODUCT_LOADED":
      console.log(action);
      return {
        ...state,
        list: action.payload.products,
        page_num: action.payload.page_num,
        total: action.payload.count,
      };
    default:
      return state;
  }
};
export default products;
