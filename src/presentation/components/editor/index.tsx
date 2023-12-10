import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

type Props = {
  onChange: (value: string) => void
  data?: string
}

export const Editor = ({ onChange, data = '' }: Props): JSX.Element => {
  const handleChange = (_, editor: ClassicEditor): void => {
    onChange(editor.getData())
  }
  return <CKEditor data={data} editor={ClassicEditor} onChange={handleChange} />
}
