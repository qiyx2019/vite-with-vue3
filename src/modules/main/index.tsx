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
import { debounce, debounceTime, auditTime, map } from 'rxjs/operators'
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
  let sub = new Subject<string>()
  sub
    .pipe(
      map((x) => x),
      debounceTime(1500)
    )
    .subscribe((x) => {
      new Promise((resolve, reject) =>{
        resolve(1)
      }).then(()=>{
        output.value = x;
      }).catch((err) =>console.log(err,'err'))
    })
  let sub1 = new Subject<any>()

  let output1 = sub1.pipe(map((x) => x)).subscribe((x) => x)
  console.log(output1, 'output1')

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
