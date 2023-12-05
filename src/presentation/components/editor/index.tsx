import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

type Props = {
  onChange: (value: string) => void
}

export const Editor = ({ onChange }: Props): JSX.Element => {
  const handleChange = (_, editor: ClassicEditor): void => {
    onChange(editor.getData())
  }

  return <CKEditor editor={ClassicEditor} onChange={handleChange} />
}
