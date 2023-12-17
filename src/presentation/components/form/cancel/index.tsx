import { Button, type ButtonProps } from '../button'

type Props = Omit<ButtonProps, 'label'> & {
  label?: string
}
export const Cancel = ({ label = 'Cancel', ...rest }: Props): JSX.Element => {
  return <Button type="button" label={label} {...rest} />
}
