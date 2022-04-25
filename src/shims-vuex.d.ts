/* eslint-disable */
import { TRootStore } from "@/store";

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: TRootStore
  }
}
