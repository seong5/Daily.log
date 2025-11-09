export const BUTTON_SIZES = {
  sm: {
    container: 'px-3 py-2',
    text: 'text-[14px]',
  },
  md: {
    container: 'px-4 py-2 w-[50px] h-[38px]',
    text: 'text-[15px]',
  },
  lg: {
    container: 'w-[326px] h-[44px]',
    text: 'text-[16px]',
  },
} as const

export const BUTTON_VARIANTS = {
  primary: {
    container: 'bg-[#b0a0e3]',
    text: 'text-[#eeeeee]',
  },
  secondary: {
    container: 'bg-[#e0e0e0]',
    text: 'text-[#333333]',
  },
} as const
