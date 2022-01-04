declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module 'axios' {
  interface AxiosInstance {
    // eslint-disable-next-line no-undef
    (config: AxiosRequestConfig): Promise<any>
  }
}
