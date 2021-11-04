export interface IProfile {
  readonly avatar: IAvatar
  readonly bio?: string
  readonly city?: string
  readonly created_at: string
  readonly email: string
  readonly id: string
  readonly name: string
  readonly password: string
  readonly updated_at: string
  readonly username: string
  readonly verified?: string
}

interface IAvatar {
  created_at: string
  id: string
  public_id: string
  profile: IProfile
  profile_id: string
  url: string
  updated_at: string
}
