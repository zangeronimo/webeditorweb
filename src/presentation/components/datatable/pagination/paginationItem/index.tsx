type Props = {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export const PaginationItem = ({
  number,
  isCurrent = false,
  onPageChange,
}: Props): JSX.Element => {
  return (
    <button
      type="button"
      disabled={isCurrent}
      onClick={() => {
        onPageChange(number)
      }}
    >
      {number}
    </button>
  )
}
