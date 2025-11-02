'use client'

import type { SelectFieldClientComponent } from 'payload'
import { useEffect, useMemo, useState } from 'react'

import { Collection, client } from '@/lib/client'
import { SelectField as PayloadSelectField } from '@payloadcms/ui'

export const CollectionSelectComponent: SelectFieldClientComponent = (props) => {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true)
        setError(null)

        const collections = await client.getCollections({
          limit: 2000,
          page: 1,
        })

        setCollections(collections)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch collections'
        setError(errorMessage)
        console.error('Error fetching collections:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  const options = useMemo(() => {
    return collections.map((collection) => ({
      label: collection.name || collection.slug,
      value: collection.slug,
    }))
  }, [collections])

  const fieldWithOptions = {
    ...props.field,
    options: loading ? [] : options,
  }

  const newProps = {
    ...props,
    field: fieldWithOptions,
  }

  if (loading) {
    return (
      <div className="collection-select-field-component">
        <PayloadSelectField {...newProps} />
        <div style={{ marginTop: '8px', color: '#666' }}>Loading collections...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="collection-select-field-component">
        <PayloadSelectField {...newProps} />
        <div style={{ marginTop: '8px', color: 'red' }}>{error}</div>
      </div>
    )
  }

  return <PayloadSelectField {...newProps} />
}
