import { useTransition } from '@react-spring/web'
import Styles from './styles.module.scss'
import { Toast } from './toast'

export type ToastMessage = {
  id: string
  type?: 'success' | 'danger' | 'info' | 'warning'
  title: string
  description: string
}

type Props = {
  messages: ToastMessage[]
}

export const ToastContainer = ({ messages, ...rest }: Props): JSX.Element => {
  const messagesWithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  })

  return (
    <div className={Styles.container} {...rest}>
      {messagesWithTransitions((props, item) => (
        <Toast message={item} style={props} />
      ))}
    </div>
  )
}
