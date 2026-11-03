import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

/**
 * Boutons IUGM (prototype v2 + Fondations « Boutons, badges, liens ») :
 * pilules, cible tactile ≥ 44 px, 52 px par défaut, focus clavier vert (base CSS).
 */
export const buttonVariants = cva(
  'group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap no-underline transition duration-150 ease-out-soft select-none disabled:pointer-events-none disabled:bg-sand-200 disabled:text-foreground-muted aria-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-iugm-blue-800 hover:text-primary-foreground',
        outline: 'border-[1.5px] border-primary bg-transparent text-primary hover:bg-iugm-blue-50 hover:text-primary',
        light: 'bg-white text-primary hover:bg-iugm-blue-50 hover:text-primary',
        outlineLight: 'border-[1.5px] border-white/75 bg-transparent text-white hover:bg-white/10 hover:text-white',
        ghost: 'bg-transparent text-foreground hover:bg-sand-200 hover:text-foreground',
        link: 'h-auto rounded-none px-0 text-primary hover:text-accent-text',
      },
      size: {
        default: 'h-13 px-6 text-base',
        md: 'h-12 px-7 text-base',
        sm: 'h-11 px-5 text-sm',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
