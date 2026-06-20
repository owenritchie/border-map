import { useEffect, useRef, useState } from 'react'
import { byCode } from '../lib/game'
import Flag from './Flag'

export default function CountrySelect({ value, onChange, options, index, state, disabled }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const rootRef = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const selected = value ? byCode[value] : null

  const q = query.trim().toLowerCase()
  const filtered = q
    ? options
        .filter((c) => c.name.toLowerCase().includes(q))
        .sort((a, b) => {
          const sa = a.name.toLowerCase().startsWith(q) ? 0 : 1
          const sb = b.name.toLowerCase().startsWith(q) ? 0 : 1
          return sa - sb || a.name.localeCompare(b.name)
        })
    : options

  useEffect(() => {
    if (!open) return
    function onDoc(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) close()
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  function close() {
    setOpen(false)
    setQuery('')
  }

  function choose(country) {
    onChange(country.code)
    close()
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[active]) choose(filtered[active])
    } else if (e.key === 'Escape') {
      close()
    }
  }

  useEffect(() => {
    if (!open || !listRef.current) return
    const el = listRef.current.children[active]
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  const stateClass = state ? ` slot--${state}` : ''

  return (
    <div className="slot" ref={rootRef}>
      <button
        type="button"
        className={`slot__square${stateClass}${selected ? ' slot__square--filled' : ''}`}
        onClick={() => (open ? close() : !disabled && setOpen(true))}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="slot__index">{index + 1}</span>
        {selected ? (
          <>
            <Flag country={selected} className="slot__flag" />
            <span className="slot__name">{selected.name}</span>
          </>
        ) : (
          <span className="slot__placeholder">Choose a country</span>
        )}
      </button>

      {open && (
        <div className="combo" role="dialog">
          <input
            ref={inputRef}
            className="combo__search"
            type="text"
            value={query}
            placeholder="Type to search"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Search countries"
          />
          <ul className="combo__list" ref={listRef} role="listbox">
            {filtered.length === 0 && <li className="combo__empty">No matches</li>}
            {filtered.map((c, i) => (
              <li key={c.code}>
                <button
                  type="button"
                  className={`combo__option${i === active ? ' combo__option--active' : ''}${
                    c.code === value ? ' combo__option--selected' : ''
                  }`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(c)}
                >
                  <Flag country={c} className="combo__flag" />
                  <span>{c.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
