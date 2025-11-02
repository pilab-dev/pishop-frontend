'use client'

import type { ArrayField } from 'payload'
import React, { useCallback, useMemo, useState, type ChangeEvent } from 'react'

import { FieldLabel, TextInput, useField } from '@payloadcms/ui'

import './index.scss'

type TagRow = {
  id?: string | null
  tag?: string | null
}

type TagsComponentProps = {
  field: ArrayField
  path?: string
  readOnly?: boolean
}

export const TagsComponent: React.FC<TagsComponentProps> = ({ field, path, readOnly }) => {
  const { label, required } = field
  const fieldPath = path || field.name

  const { value, setValue } = useField<TagRow[]>({
    path: fieldPath,
  })

  const [inputValue, setInputValue] = useState('')

  const tags = useMemo(() => {
    if (Array.isArray(value)) {
      return value.filter((row): row is TagRow => typeof row === 'object' && row !== null)
    }

    return []
  }, [value])

  const saveTags = useCallback(
    (next: TagRow[]) => {
      setValue(next)
    },
    [setValue],
  )

  const addTag = useCallback(() => {
    const trimmed = inputValue.trim()

    if (!trimmed) {
      return
    }

    const exists = tags.some((row) => (row.tag || '').toLowerCase() === trimmed.toLowerCase())

    if (exists) {
      setInputValue('')
      return
    }

    const nextTags = [...tags, { tag: trimmed }]

    saveTags(nextTags)
    setInputValue('')
  }, [inputValue, saveTags, tags])

  const isReadOnly = Boolean(readOnly || field?.admin?.readOnly)

  const removeTag = useCallback(
    (index: number) => {
      const nextTags = tags.filter((_row, rowIndex) => rowIndex !== index)

      saveTags(nextTags)
    },
    [saveTags, tags],
  )

  const handleRemoveClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
      event.preventDefault()
      event.stopPropagation()

      if (isReadOnly) return

      removeTag(index)
    },
    [isReadOnly, removeTag],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (readOnly) return

      if (event.key === 'Enter' || event.key === ',' || event.key === 'Tab') {
        if (event.key !== 'Tab') {
          event.preventDefault()
        }

        addTag()
      }
    },
    [addTag, readOnly],
  )

  const labelValue = typeof label === 'string' ? label : field.name
  const description =
    typeof field?.admin?.description === 'string' ? field.admin.description : undefined

  const handleInputChange = useCallback((next: ChangeEvent<HTMLInputElement> | string) => {
    if (typeof next === 'string') {
      setInputValue(next)
      return
    }

    setInputValue(next.target.value)
  }, [])

  return (
    <div className="field-type tags-field-component">
      <FieldLabel htmlFor={`field-${fieldPath}`} label={labelValue} required={required} />

      {description ? <div className="tags-field-component__description">{description}</div> : null}

      <div className="tags-field-component__chips">
        {tags.map((row, index) => {
          const display = row.tag?.trim()

          if (!display) return null

          const key = row.id ?? `${display}-${index}`

          return (
            <span className="tags-field-component__chip" key={key}>
              <span className="tags-field-component__chip-text">{display}</span>
              {!isReadOnly ? (
                <button
                  type="button"
                  className="tags-field-component__chip-remove"
                  onClick={(event) => handleRemoveClick(event, index)}
                  aria-label={`Remove tag ${display}`}
                >
                  x
                </button>
              ) : null}
            </span>
          )
        })}
      </div>

      {!isReadOnly ? (
        <TextInput
          path={fieldPath}
          value={inputValue}
          placeholder="Add tag and press Enter"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      ) : null}
    </div>
  )
}
