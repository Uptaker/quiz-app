export function formatBytes(bytes: number, decimals: number = 2) {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals < 0 ? 0 : decimals))} ${sizes[i]}`
}

export function getFileExtension(name: string) {
  const splitted = name.split('.')
  return splitted[splitted.length - 1].toLowerCase()
}

export function formatUuid(uuid: string) {
  return uuid.substring(28).toUpperCase()
}