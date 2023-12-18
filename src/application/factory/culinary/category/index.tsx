import { CategoryService } from '@/application/service/culinary/category'
import { LevelService } from '@/application/service/culinary/level'
import { api } from '@/infra/provider/axiosProvider'
import { Categories } from '@/presentation/pages/culinary/category'

export const CategoryFactory = (): JSX.Element => {
  const categoryService = new CategoryService(api)
  const levelService = new LevelService(api)
  return (
    <Categories
      _categoryService={categoryService}
      _levelService={levelService}
    />
  )
}
