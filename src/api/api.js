import Axios from 'axios';

const authKey = '6c55fa36a2138b23a52e74619bfdae147fa0c3e1';

export const getProducts = (pageNo, itemsPerPage) => (
  Axios({
    method: 'GET',
    url: 'http://omega.jdomni.com/omni-automation-tools/training/getAllProducts',
    params: {
      pageNo,
      itemsPerPage,
      auth_key: authKey,
    },
  })
);

export const cart = (productId, quantity) => (
  Axios({
    method: 'POST',
    url: 'http://omega.jdomni.com/omni-automation-tools/training/cartApi',
    data: {
      product_id: productId,
      auth_key: authKey,
      quantity,
    },
  })
);

export const getCartItems = () => (
  Axios({
    method: 'GET',
    url: 'http://omega.jdomni.com/omni-automation-tools/training/getAllCartItems',
    params: {
      auth_key: authKey,
    },
  })
);
