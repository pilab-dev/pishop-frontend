import { gql } from '@apollo/client'

export const GET_COLLECTIONS_QUERY = gql`
  query Collections($pagination: PaginationInput) {
    collections(pagination: $pagination) {
      id
      name
      slug
      description
    }
  }
`
