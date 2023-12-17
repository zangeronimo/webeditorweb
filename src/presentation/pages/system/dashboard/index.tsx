import { Editor } from '@/presentation/components/editor'
import { Button } from '@/presentation/components/form'
import { ViewBox } from '@/presentation/components/viewBox'

export const Dashboard = (): JSX.Element => {
  return (
    <div>
      <h1>Welcome</h1>
      <ViewBox title="HTML Editor">
        <Editor
          onChange={data => {
            console.log(data)
          }}
        />
      </ViewBox>
      <Button label="success" pattern="success" />
      <Button label="danger" pattern="danger" />
      <Button label="warning" pattern="warning" />
      <Button label="info" pattern="info" />
      <Button label="normal" pattern="normal" />
      <Button label="link" pattern="link" />
    </div>
  )
}
