import { RatingService } from '@/application/service/culinary/rating'
import { RecipeService } from '@/application/service/culinary/recipe'
import { api } from '@/infra/provider/axiosProvider'
import { Ratings } from '@/presentation/pages/culinary/rating'

export const RatingFactory = (): JSX.Element => {
  const ratingService = new RatingService(api)
  const recipeService = new RecipeService(api)
  return (
    <Ratings _ratingService={ratingService} _recipeService={recipeService} />
  )
}
