import {
  defineComponent,
  ref,
  reactive,
  toRef,
  computed,
  onMounted,
  onUpdated,
  onUnmounted,
  getCurrentInstance,
} from 'vue'
import {
  of,
  timer,
  interval,
  Subject,
  AsyncSubject,
  from,
  Observable,
  mergeMap,
  forkJoin,
  switchMap,
  concatMap,
} from 'rxjs'
import {
  debounce,
  debounceTime,
  auditTime,
  map,
  scan,
  last, //取最后一次值
  reduce,
  startWith,
  endWith,
  take,
  takeUntil,
} from 'rxjs/operators'
interface Ref<T> {
  value: T
}

export default defineComponent((props): (() => JSX.Element) => {
  const internalInstance = getCurrentInstance()
  onMounted(() => {
    console.log('mounted!')
  })
  onUpdated(() => {
    console.log('updated!')
  })
  onUnmounted(() => {
    console.log('unmounted!')
  })

  const refs: Ref<string> = ref('tsx')
  const plusOne = computed(() => refs.value + 1)
  const state: Ref<Record<any, any>> = ref({})
  const handleClick = () => {
    console.log('no params', state.value.name)
  }
  const handleClickInput = (msg: string) => {
    console.log('msg', msg, plusOne.value)
  }
  const App = (props: any) => {
    console.log(props)
    return (
      <div
        onClick={() => {
          props.findData('123')
        }}
      >
        hello {props.msg}
      </div>
    )
  }
  const findData = (e: any) => {
    console.log(e)
  }
  console.log(refs, 'refs')
  let selected = []
  let output = ref('')
  const example = of('example', 'women', 'man')
  const examples = example.pipe(debounce(() => timer(1000)))
  examples.subscribe((x) => console.log(x))
  const interval$ = interval(1000)
  const examples1 = interval$.pipe(debounce((v) => timer(v * 200)))
  // .subscribe((x) => console.log(x))
  //查询优化,rxjs debounceTime
  let sub = new Subject<string>()
  sub
    .pipe(
      map((x) => x),
      debounceTime(1500)
    )
    .subscribe((x) => {
      new Promise((resolve, reject) => {
        resolve(1)
      })
        .then(() => {
          output.value = x
        })
        .catch((err) => console.log(err, 'err'))
    })
  let sub1 = new Subject<any>()
  //scan求和 vs reducer求和
  // 区别: scan每次都会返回求和结果,reduce只有完成时返回求和结果,scan+last = reduce
  sub1
    .pipe(reduce((x, y) => Object.assign({}, x, y), {}))
    .subscribe((x) => console.log(x))
  sub1.next({ name: 'Joe' })
  sub1.next({ age: '22' })
  sub1.next({ favoriteLanguage: 'JavaScript' })
  sub1.complete()
  const source = of(1, 2, 3)
  source
    .pipe(
      scan((x, y) => x + y, 0),
      last()
    )
    .subscribe((x) => console.log(x, 'scan'))
  const getObservable = () => {
    let res: Array<Observable<any>> = []
    sub1
      .pipe(reduce((x, y) => Object.assign({}, x, y), {}))
      .subscribe((x: any) => {
        res = [x]
      })
    sub1.next({ name: 'Joe' })
    sub1.next({ age: '22' })
    sub1.next({ favoriteLanguage: 'JavaScript' })
    sub1.complete()
    if (res) {
      return <div>{res.map((item) => item.name)}</div>
    }
    return null
  }
  let sub2 = new Subject<any>()
  sub2
    .pipe(
      startWith({ name: 'qiyx' }),
      map((x) => x),
      endWith({ address: '999' }),
      reduce((x, y) => Object.assign({}, x, y), {})
    )
    .subscribe((x) => console.log(x, 'sub2'))
  sub2.next({ age: '25' })
  sub2.complete()
  console.log(internalInstance, 'proxy')
  //forkJoin 
  let sub3 = new Subject<any>();
  sub3.pipe(
    mergeMap(q => forkJoin(
      ...q.map(
        (val) => new Promise((resolve) => setTimeout(()=>resolve(val),5000 ))
      )
    ))
  ).subscribe(x => console.log(x,'x')) 
  sub3.next([{name:1},{name:12},{name:13},{name:14},{name:15}]);
  let sub4 = new Subject<any>() //take
  sub4.pipe(
    take(2)
  ).subscribe((x)=> console.log(x,'sub4'))
  sub4.next(1)
  sub4.next(21)
  sub4.next(13)
  sub4.next(14)
  let sub5 = new Subject<any>() //takeUntil
  sub5.pipe(takeUntil(
    timer(5000)
  )).subscribe((x)=> console.log(x,'sub5'))
  sub5.next(1)
  sub5.next(2)
  sub5.next(3)
  sub5.next(5)
  //mergeMap
  let sub6 = new Subject<any>()
  sub6.pipe(
    mergeMap(x => of(`${x} world`))
  ).subscribe(x => console.log(x,'sub6'))
  sub6.next('hello')
  let sub7 = new Subject<any>()
  const promise = (x:any) => new Promise((resolve)=> resolve(`${x} from promise`))
  sub7.pipe(mergeMap(x => promise(x))).subscribe(x => console.log(x,'sub7'))
  sub7.next('hello')
  let sub8 = new Subject<any>()
  sub8.pipe(mergeMap(x => promise(x),
      (valS,valP)=> `${valS} from source --- ${valP}`
    )).subscribe(x => console.log(x))
    sub8.next('hello')
  return () => (
    <>
      <div>
        {output.value}--{refs.value}
      </div>
      <div onClick={handleClick}>无参数</div>
      <App msg="app1" findData={findData} />
      <input
        onInput={({ target }: any): void => {
          console.log(target.value, 'e')
          sub.next(target.value)
          refs.value = target.value
          state.value = { name: target.value }
        }}
      />
      {/* {[1, 2, 3, 4, 5].map((item) => (
        <div>
          <div
            onClick={() => selected.push(item)}
            style={{ width: 40, height: 40, color: 'red' }}
          >
            {item}
          </div>
        </div>
      ))} */}
      <div onClick={() => handleClickInput('youcanshu')}>you参数</div>
    </>
  )
})
