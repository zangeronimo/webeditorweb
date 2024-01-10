import { type ChangeEvent } from 'react'
import { Group } from '../../group'
import { Input } from '../input'

type Props = {
  label?: string
  name?: string
  callback: (base64: string) => void
}

export const Upload = ({
  label = 'Upload a new image',
  name = 'imageUpload',
  callback,
}: Props): JSX.Element => {
  const handleChangeFileUpload = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    e.preventDefault()
    if (!e.target?.files?.length) return
    const imageUpload = await file2Base64(e.target?.files[0])
    if (imageUpload)
      callback(imageUpload.replace('application/octet-stream', 'image/jpeg'))
  }

  const file2Base64 = async (blob: any): Promise<string> => {
    return await new Promise(resolve => {
      const reader = new FileReader()
      reader.onloadend = () => {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        resolve(reader.result.toString() ?? '')
      }
      reader.readAsDataURL(blob)
    })
  }

  return (
    <Group>
      <Input
        type="file"
        label={label}
        name={name}
        onChange={handleChangeFileUpload}
      />
    </Group>
  )
}
