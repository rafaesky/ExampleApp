import { RegisterService } from '@/services/register.service'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

describe('Register Service', () => {
  it('should hash user password uponm registration', async () => {
    const registerService = new RegisterService({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date()
        }
      }
    })

    const { user } = await registerService.execute({
      name: 'Teste name',
      email: 'testeemail@gmail.com',
      password: '123456'
    })
    const isPassWordCorrectlyHashed = compare(
      '123456',
      user.password_hash
    )
    expect(isPassWordCorrectlyHashed).toBe(true)

  })
})