import { defineComponent,ref} from 'vue'

export default defineComponent(()=>{
  const refs = ref<string>('tsx');
  const handleClick = () => {
    console.log('underfined')
  }
  const handleClickInput = (msg:string) => {
    console.log('msg',msg)
  }
  return ()=> (<>
    <div>{refs.value}</div>
    <div onClick={handleClick}>无参数</div>
    <div onClick={()=>handleClickInput('youcanshu')}>you参数</div>
  </>)
})