import { useBreakpoints } from '@vueuse/core'
export default () => {
  
  const breakpoint = useBreakpoints({
    lg: 1024,
    desktop: 1440,
  })
  
  return {
    breakpoint
  }
}