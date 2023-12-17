import { Button, type ButtonProps } from '../button'

type Props = Omit<ButtonProps, 'label'> & {
  label?: string
}
export const Delete = ({ label = 'Delete', ...rest }: Props): JSX.Element => {
  return <Button type="button" label={label} pattern="danger" {...rest} />
}
