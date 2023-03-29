import { createActions, handleActions } from "redux-actions";

export const GET_PRODUCT            = 'product/GET_PRODUCT';
export const GET_PRODUCTS           = 'product/GET_PRODUCTS';
export const GET_PRODUCTS_LICENSES  = 'product/GET_PRODUCTS_LICENSES';
export const POST_PRODUCT           = 'product/POST_PRODUCT';
export const PUT_PRODUCT            = 'product/PUT_PRODUCT';
export const DELETE_PRODUCT         = 'product/DELETE_PRODUCT';

const initialState = [];

const actions = createActions({
    [GET_PRODUCT]: () => {},
    [GET_PRODUCTS]: () => {},
    [GET_PRODUCTS_LICENSES]: () => {},
    [POST_PRODUCT]: () => {},
    [PUT_PRODUCT]: () => {},
    [DELETE_PRODUCT]: () => {}
});

const productReducer = handleActions(
    {
        [GET_PRODUCT]: (state, {payload}) => {
            return payload;
        },
        [GET_PRODUCTS]: (state, {payload}) => {
            return payload;
        },
        [GET_PRODUCTS_LICENSES]: (state, {payload}) => {
            return payload;
        },
        [POST_PRODUCT]: (state, {payload}) => {
            return payload;
        },
        [PUT_PRODUCT]: (state, {payload}) => {
            return payload;
        },
        [DELETE_PRODUCT]: (state, {payload}) => {
            return payload;
        }
    }, initialState
);
export default productReducer;