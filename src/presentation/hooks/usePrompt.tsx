import { useCallback, useContext, useEffect, useState } from 'react'
import { UNSAFE_NavigationContext } from 'react-router-dom'

const useConfirmExit = (confirmExit: () => void, when = true): any => {
  const { navigator } = useContext(UNSAFE_NavigationContext)

  useEffect(() => {
    if (!when) return
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const push = navigator.push
    navigator.push = () => {
      confirmExit()
    }

    return () => {
      navigator.push = push
    }
  }, [navigator, confirmExit, when])
}

export const usePrompt = (message: string, when = true): any => {
  const [isRefresh, setIsRefresh] = useState(false)

  const confirmExit = useCallback(() => {
    !isRefresh && window.alert(message)
  }, [message, isRefresh])

  useConfirmExit(confirmExit, when)

  useEffect(() => {
    if (when) {
      window.onbeforeunload = () => message
    }
    return () => {
      window.onbeforeunload = null
    }
  }, [message, when])

  return {
    isRefresh,
    setIsRefresh,
  }
}
