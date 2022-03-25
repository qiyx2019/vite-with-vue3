import {MockMethod} from "vite-plugin-mock"
let data:any[] = []
for(let i = 0;i>1000;i++)
{
  data.push({
    id:Math.random()*10E10,
    name:i+'_'+'davis'
  })
}
export default [
  {
    url: '/api/getList',
    method: 'get',
    response: () => {
      return {
          code: 0,
          message: null,
          data
      }
    }
  },
] as MockMethod[]

 