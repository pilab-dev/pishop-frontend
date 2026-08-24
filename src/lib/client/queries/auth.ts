import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      success
      token
      refreshToken
      user {
        id
        email
        firstName
        lastName
      }
      errors {
        code
        message
        field
      }
    }
  }
`

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      success
      token
      refreshToken
      user {
        id
        email
        firstName
        lastName
      }
      errors {
        code
        message
        field
      }
    }
  }
`

export const LOGOUT = gql`
  mutation Logout($input: LogoutInput!) {
    logout(input: $input) {
      success
      errors {
        code
        message
        field
      }
    }
  }
`
