import axios from "axios";

const APIURL = `${process.env.REACT_APP_BACKEND_URL}`;

export const createProduct = infos => axios.post(`${APIURL}/api/product`, infos, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

export const getProduct = id => axios.get(`${APIURL}/api/product/${id}`);

export const getAllProducts = () => axios.get(`${APIURL}/api/product/all`);

export const deleteProduct = id => axios.delete(`${APIURL}/api/product/${id}`);

export const updateProduct = (id, infos) => axios.post(`${APIURL}/api/product/edit/${id}`, infos);

export const getUser = id => axios.get(`${APIURL}/api/user/${id}`);