import { Editor } from '@/presentation/components/editor'
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
    </div>
  )
}
