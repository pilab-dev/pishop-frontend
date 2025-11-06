'use client'

import { Search } from 'lucide-react'
import * as React from 'react'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface FoxPostPoint {
  place_id: number
  operator_id: string
  name: string
  address: string
  zip: string
  city: string
  street: string
  geolat: number
  geolng: number
  variant: string
  depot: string
  isOutdoor: boolean
}

interface FoxPostSelectComboboxProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export function FoxPostSelectCombobox({
  value,
  onChange,
  placeholder = 'Select FoxPost pickup point...',
  className,
}: FoxPostSelectComboboxProps) {
  const [pickupPoints, setPickupPoints] = React.useState<FoxPostPoint[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [searchTerm, setSearchTerm] = React.useState('')

  const selectedPoint = pickupPoints.find((point) => point.place_id.toString() === value)

  React.useEffect(() => {
    const fetchPickupPoints = async () => {
      setLoading(true)
      try {
        setError(null)

        const response = await fetch('https://cdn.foxpost.hu/foxplus.json')
        if (!response.ok) {
          throw new Error('Failed to fetch FoxPost data')
        }

        const data: FoxPostPoint[] = await response.json()
        setPickupPoints(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch pickup points'
        setError(errorMessage)
        console.error('Error fetching FoxPost pickup points:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPickupPoints()
  }, [])

  // Filter points based on search term
  const filteredPoints = React.useMemo(() => {
    if (!searchTerm) return pickupPoints.slice(0, 100) // Limit for performance

    const lowerSearch = searchTerm.toLowerCase()
    return pickupPoints
      .filter(
        (point) =>
          point.name.toLowerCase().includes(lowerSearch) ||
          point.city.toLowerCase().includes(lowerSearch) ||
          point.address.toLowerCase().includes(lowerSearch) ||
          point.operator_id.toLowerCase().includes(lowerSearch),
      )
      .slice(0, 50) // Limit filtered results
  }, [pickupPoints, searchTerm])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  if (error) {
    return (
      <div className="space-y-2">
        <Select disabled>
          <SelectTrigger className={cn('w-full', className)}>
            <SelectValue placeholder="Error loading pickup points" />
          </SelectTrigger>
        </Select>
        <p className="text-sm text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search pickup points..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-9"
        />
      </div>

      <Select value={value} onValueChange={onChange} disabled={loading}>
        <SelectTrigger className={cn('w-full min-h-[44px] h-auto', className)}>
          <SelectValue
            placeholder={
              loading
                ? 'Loading FoxPost pickup points...'
                : selectedPoint
                  ? `${selectedPoint.name} (${selectedPoint.operator_id})`
                  : placeholder
            }
          />
        </SelectTrigger>
        <SelectContent className="max-h-80 min-w-[400px]">
          {filteredPoints.length === 0 && !loading && (
            <div className="p-2 text-sm text-muted-foreground text-center">
              No pickup points found
            </div>
          )}
          {filteredPoints.map((point) => (
            <SelectItem key={point.place_id} value={point.place_id.toString()}>
              <div className="flex flex-col py-1">
                <span className="font-medium text-sm leading-tight">{point.name}</span>
                <span className="text-xs text-muted-foreground leading-tight">{point.city}, {point.address}</span>
                <span className="text-xs text-muted-foreground leading-tight">
                  {point.operator_id} • {point.variant}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
