import { defineComponent,ref,FunctionalComponent,VueElement} from 'vue'
import Helo from "./components/HelloWorld.vue"
import { useState } from './utils/hooks';
interface PROPS<T> {
  msg:T;
  findData:Function
}
type App = FunctionalComponent<PROPS<string>>;
export default defineComponent(():()=>JSX.Element=>{
  const refs = ref<string>('tsx');
  const handleClick = () => {
    console.log('no params')
  }
  const handleClickInput = (msg:string) => {
    console.log('msg',msg)
  }
  const App:App = (props) => {
    console.log(props)
    return <div onClick={()=> {props.findData('123')}}>hello {props.msg}</div>
  }
   const findData = (e:any) => {console.log(e)}
  console.log(refs,'refs')
  
  return ()=> (<>
    <div>{refs.value}</div>
    <div onClick={handleClick}>无参数</div>
    <Helo msg={2344} />
    <App msg="app1" findData={findData} />
    <input onChange={({target} :any):void => {
      console.log(target.value,"e")
    }} />
    <div onClick={()=>handleClickInput('youcanshu')}>you参数</div>
  </>)
})