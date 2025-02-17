declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

interface Window {
  ethereum?: {
    request: (request: { method: string, params?: any[] }) => Promise<any>
  }
}
