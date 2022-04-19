import { 
  onMounted,
  onUpdated,
  onUnmounted
} from "vue";
type noop = () => {};
type Dependencies<T> = Array<T> 
function useEffect(fn:noop,dependencies ?:Dependencies<any> | undefined) {
  if(dependencies&&dependencies.length==0) {
    onMounted(fn)
  }
}
export default {
  useEffect
}