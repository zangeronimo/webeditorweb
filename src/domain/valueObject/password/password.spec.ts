import { Messages } from '@/domain/messages'
import { Password } from '.'

describe('validate Password', () => {
  test('Create a valid password', () => {
    const value = '123456'
    const password = new Password(value)
    expect(password.value).toEqual(value)
  })

  test('Verify if the created password is invalid', () => {
    const value = '12345'
    const password = new Password(value)
    expect(() => {
      password.validate()
    }).toThrow(new RegExp(Messages.passwordMinSize, 'g'))
  })

  test('Compare password with an equal compare', () => {
    const value = '123456'
    const compare = '123456'
    const password = new Password(value)
    expect(() => {
      password.isEqual(compare)
    }).not.toThrow()
  })

  test('Compare password with an diferent compare', () => {
    const value = '123456'
    const compare = '456789'
    const password = new Password(value)
    expect(() => {
      password.isEqual(compare)
    }).toThrow(new RegExp(Messages.passwordNotEqual, 'g'))
  })
})
