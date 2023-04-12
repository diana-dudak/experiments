import axios from "axios";
import { DataItem } from "./model";

const ENDPOINT = "http://localhost:5000";

export const getData = async () => {
  return axios.get(`${ENDPOINT}/getData`).then((res) => res.data);
};

export const updateData = async (body: DataItem[]) => {
  return axios.post(`${ENDPOINT}/updateData`, body).then((res) => res.data);
};

export const downloadImage = async () => {
  // return axios.get(`${ENDPOINT}/downloadImage`).then((res) => res.data);
  axios({
    url: `${ENDPOINT}/downloadImage`, //your url
    method: 'GET',
    responseType: 'blob', // important
}).then((response) => {
    // create file link in browser's memory
    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'image.png'); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
});
};
