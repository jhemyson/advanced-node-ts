import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { AcessToken } from '@/domain/models'

class FacebookAuthenticationService {
  constructor (private readonly loadFacebookUserApi: LoadFacebookUserApi) {}

  async execute ({ token }: FacebookAuthentication.Params): Promise<void> {
    return await this.loadFacebookUserApi.loadUser({ token })
  }
}

interface LoadFacebookUserApi {
  loadUser: ({ token }: LoadFacebookUserApi.Params) => Promise<void>
}

export namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }

  export type Result = AcessToken | AuthenticationError
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string

  async loadUser ({ token }: LoadFacebookUserApi.Params): Promise<void> {
    this.token = token
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi)
    await sut.execute({ token: 'any_token' })

    expect(loadFacebookUserByTokenApi.token).toBe('any_token')
  })
})
