import Request from "../utils/request";

export const getData =()=> Request('/api/getList').then(res =>res).catch(err => err)