import { NewsletterService } from '@/application/service/institutional/newsletter'
import { api } from '@/infra/provider/axiosProvider'
import { Newsletters } from '@/presentation/pages/institutional/newsletter'

export const NewsletterFactory = (): JSX.Element => {
  const newsletterService = new NewsletterService(api)
  return <Newsletters _newsletterService={newsletterService} />
}
