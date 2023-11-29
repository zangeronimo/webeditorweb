import { ModuleService } from '@/application/service/system/module'
import { CompanyService } from '@/application/service/system/company'
import { AxiosProvider } from '@/infra/provider/axiosProvider'
import { Companies } from '@/presentation/pages/system/companies'

export const CompanyFactory = (): JSX.Element => {
  const httpProvider = new AxiosProvider(process.env.API_URL)
  const companyService = new CompanyService(httpProvider)
  const moduleService = new ModuleService(httpProvider)
  return (
    <Companies
      _companyService={companyService}
      _moduleService={moduleService}
    />
  )
}
