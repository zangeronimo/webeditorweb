import { RecipeService } from '@/application/service/culinary/recipe'
import { CategoryService } from '@/application/service/culinary/category'
import { api } from '@/infra/provider/axiosProvider'
import { Recipes } from '@/presentation/pages/culinary/recipe'

export const RecipeFactory = (): JSX.Element => {
  const recipeService = new RecipeService(api)
  const categoryService = new CategoryService(api)
  return (
    <Recipes
      _recipeService={recipeService}
      _categoryService={categoryService}
    />
  )
}
