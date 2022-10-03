import {toast} from '@zerodevx/svelte-toast'

export enum ToastType {
  ERROR, SUCCESS,  INFO
} 

export function sendToast(message: string, type: ToastType = ToastType.SUCCESS) {
  let barBackground = '#48BB78'
  let icon = '<i class="fa-solid fa-circle-check"></i>'
  if (type == ToastType.INFO) {
    barBackground = '#8fe0f5'
    icon = '<i class="fa-solid fa-circle-info"></i>'
  }
  if (type == ToastType.ERROR) {
    barBackground = '#F56565'
    icon = '<i class="fa-solid fa-triangle-exclamation"></i>'
  }
  toast.push(icon + ' ' + message, {
    pausable: true,
    theme: {
      '--toastBarBackground': barBackground
    },
  })



}