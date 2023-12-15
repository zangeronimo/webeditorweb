import { useEffect, useRef } from 'react'
import { animated } from 'react-spring'
import { type ToastMessage } from '..'

import Styles from './styles.module.scss'
import { useToast } from '@/presentation/hooks/useToast'

type Props = {
  message: ToastMessage
  style: Record<string, unknown>
}

export const Toast = ({ message, style }: Props): JSX.Element => {
  const { removeToast } = useToast()
  const ref = useRef(null)
  const hasDescription = !!message.description

  useEffect(() => {
    const timeoutFn = (): any => {
      removeToast(message.id)
    }
    const timeout = 3000
    let timer = setTimeout(timeoutFn, timeout)

    let element
    if (ref?.current) {
      element = ref.current as HTMLDivElement
    }

    if (element) {
      element.addEventListener('mouseover', () => {
        clearTimeout(timer)
      })
      element.addEventListener('mouseout', () => {
        timer = setTimeout(timeoutFn, 300)
      })
    }

    return () => {
      clearTimeout(timer)

      if (element) {
        element.removeEventListener('mouseover', () => {
          clearTimeout(timer)
        })
        element.removeEventListener('mouseout', () => {
          timer = setTimeout(timeoutFn, 300)
        })
      }
    }
  }, [removeToast, message])

  const styleWrap = `${Styles.container} ${Styles[message.type ?? 'info']} ${
    !hasDescription ? Styles.description : ''
  }`

  return (
    <animated.div className={styleWrap} ref={ref} style={style}>
      {message.type}
      <div>
        <strong>{message.title}</strong>
        {hasDescription && <p>{message.description}</p>}
      </div>
      <button
        onClick={() => {
          removeToast(message.id)
        }}
        title="Close"
      >
        x
      </button>
    </animated.div>
  )
}
