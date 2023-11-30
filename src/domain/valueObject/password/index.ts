import { Messages } from '@/domain/messages'

export class Password {
  constructor(readonly value: string) {
    this.validate()
  }

  private readonly validate = (): void => {
    if (this.value.length <= 5) {
      throw new Error(Messages.passwordMinSize)
    }
  }

  public isEqual = (confirm: string): void => {
    if (this.value !== confirm) {
      throw new Error(Messages.passwordNotEqual)
    }
  }
}
