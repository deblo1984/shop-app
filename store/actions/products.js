import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        "https://mobile-shop-e2ab8-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const resData = await response.json();
      //console.log(resData);
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCT,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://mobile-shop-e2ab8-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      dispatch({ type: DELETE_PRODUCT, pId: productId });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    //http firebase request
    const response = await fetch(
      `https://mobile-shop-e2ab8-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://mobile-shop-e2ab8-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json?auth=${token}`,
      {
        method: "PUT",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId: userId,
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({
      type: UPDATE_PRODUCT,
      pId: id,
      productData: {
        ownerId: userId,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};
