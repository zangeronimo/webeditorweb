import { Button, type ButtonProps } from '../button'

type Props = Omit<ButtonProps, 'label'> & {
  label?: string
}
export const Edit = ({ label = 'Edit', ...rest }: Props): JSX.Element => {
  return <Button type="button" label={label} pattern="info" {...rest} />
}
