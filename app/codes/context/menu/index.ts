import { useContext } from 'react'
import Context from './Context'
export { default } from './Provider'
export type { MenuContext } from './Context'

export function useMenu() {
  return useContext(Context)
}
