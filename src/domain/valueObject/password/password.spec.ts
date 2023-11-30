import { Messages } from '@/domain/messages'
import { Password } from '.'

describe('validate Password', () => {
  test('Create a valid password', () => {
    const value = '123456'
    const password = new Password(value)
    expect(password.value).toEqual(value)
  })

  test("Can't create an invalid password", () => {
    const value = '12345'
    expect(() => new Password(value)).toThrow(
      new RegExp(Messages.passwordMinSize, 'g'),
    )
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
