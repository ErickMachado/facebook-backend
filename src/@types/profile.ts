export interface IProfile {
  readonly bio?: string
  readonly city?: string
  readonly created_at: Date
  readonly email: string
  readonly id: string
  readonly name: string
  readonly password: string
  readonly updated_at: Date
  readonly username: string
  readonly verified?: Date
}
