import { LevelService } from '@/application/service/culinary/level'
import { api } from '@/infra/provider/axiosProvider'
import { Levels } from '@/presentation/pages/culinary/level'

export const LevelFactory = (): JSX.Element => {
  const levelService = new LevelService(api)
  return <Levels _levelService={levelService} />
}
