'use client'

import type { SelectFieldClientComponent } from 'payload'
import { useEffect, useMemo, useState } from 'react'

import { Product, client } from '@/lib/client'
import { SelectField as PayloadSelectField } from '@payloadcms/ui'

export const ProductSelectComponent: SelectFieldClientComponent = (props) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const products = await client.getProducts({
          limit: 1000,
          page: 1,
        })

        setProducts(products)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products'
        setError(errorMessage)
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const options = useMemo(() => {
    return products.map((product) => ({
      label: product.name || product.slug,
      value: product.id,
    }))
  }, [products])

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
      <div className="product-select-field-component">
        <PayloadSelectField {...newProps} />
        <div style={{ marginTop: '8px', color: '#666' }}>Loading products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="product-select-field-component">
        <PayloadSelectField {...newProps} />
        <div style={{ marginTop: '8px', color: 'red' }}>{error}</div>
      </div>
    )
  }

  return <PayloadSelectField {...newProps} />
}



