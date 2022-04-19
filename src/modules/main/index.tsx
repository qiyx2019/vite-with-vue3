import {
  defineComponent,
  ref,
  reactive,
  toRef,
  computed,
  onMounted,
  onUpdated,
  onUnmounted,
} from 'vue'
import { of, timer, interval, Subject, AsyncSubject, from } from 'rxjs'
import {
  debounce,
  debounceTime,
  auditTime,
  map,
  scan,
  last, //取最后一次值
  reduce,
} from 'rxjs/operators'
interface Ref<T> {
  value: T
}

export default defineComponent((): (() => JSX.Element) => {
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
    .pipe(
      reduce((x, y) =>Object.assign({},x,y), {}),
    )
    .subscribe((x) => console.log(x))
    sub1.next({ name: 'Joe' })
    sub1.next({ age: '22' })
    sub1.next({ favoriteLanguage: 'JavaScript' });
    sub1.complete()
  const source = of(1, 2, 3)
  source
    .pipe(
      scan((x, y) => x + y, 0),
      last()
    )
    .subscribe((x) => console.log(x, 'scan'))
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
