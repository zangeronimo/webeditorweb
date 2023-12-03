import { ModuleService } from '@/application/service/system/module'
import { CompanyService } from '@/application/service/system/company'
import { api } from '@/infra/provider/axiosProvider'
import { Companies } from '@/presentation/pages/system/companies'

export const CompanyFactory = (): JSX.Element => {
  const companyService = new CompanyService(api)
  const moduleService = new ModuleService(api)
  return (
    <Companies
      _companyService={companyService}
      _moduleService={moduleService}
    />
  )
}
