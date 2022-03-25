import { defineComponent,ref} from 'vue'
import Helo from "./components/HelloWorld.vue"
export default defineComponent(()=>{
  const refs = ref<string>('tsx');
  const handleClick = () => {
    console.log('underfined')
  }
  const handleClickInput = (msg:string) => {
    console.log('msg',msg)
  }
  const App = (msg:any) => {
    console.log(msg)
    return <div onClick={()=> {msg.findData('123')}}>hello {msg.msg}</div>
  }
   const findData = (e:any) => {console.log(e)}
   const Hello = () => <Helo msg={234} />
  return ()=> (<>
    <div>{refs.value}</div>
    <div onClick={handleClick}>无参数</div>
    <Helo msg={2344} />
    <App msg="app1" findData={findData} />
    <div onClick={()=>handleClickInput('youcanshu')}>you参数</div>
  </>)
})