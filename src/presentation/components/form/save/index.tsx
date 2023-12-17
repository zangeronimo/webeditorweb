import { Button, type ButtonProps } from '../button'

type Props = Omit<ButtonProps, 'label'> & {
  label?: string
}

export const Save = ({ label = 'Save', ...rest }: Props): JSX.Element => {
  return <Button type="submit" label={label} pattern="success" {...rest} />
}
