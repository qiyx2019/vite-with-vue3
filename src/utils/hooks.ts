import { computed } from 'vue'
import { mapGetters, mapState, useStore, createNamespacedHelpers, mapMutations } from 'vuex'

const useMapper = (mapper:any, mapFn:Function,isFn:boolean = false ) => {
  const store = useStore()

  const storeStateFns:any = mapFn(mapper)
  const storeState = {}
  Object.keys(storeStateFns).forEach((keyFn:any) => {
    const fn = storeStateFns[keyFn].bind({ $store: store })
    storeState[keyFn] = isFn?fn:computed(fn)
  })

  return storeState
}

export const useState = (moduleName:string|Array<any>, mapper?: any) => {
  let mapperFn = mapState
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn)
}

export const useGetters = (moduleName:string|Array<any>, mapper?:any) => {
  let mapperFn = mapGetters
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn)
}
export const useMutations = (moduleName:string|Array<any>, mapper?:any) => {
   let mapperFn = mapMutations;
   if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapMutations
   } else {
     mapper = moduleName
   }
   return useMapper(mapper,mapperFn,true)
}
 