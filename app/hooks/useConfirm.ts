type Props = {
  confirm?: () => void
  cancel?: () => void
}

export const useConfirm = (option: Props) => {
  const opened = ref(false)

  const open = () => {
    opened.value = true
  }
  const close = () => {
    opened.value = false
  }
  const onConfirm = () => {
    option.confirm && option.confirm()
    close()
  }

  const onCancel = () => {
    option.cancel && option.cancel()
    close()
  }

  return {
    opened,
    open,
    close,
    onConfirm,
    onCancel,
  }
}