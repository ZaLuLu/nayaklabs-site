import { useState, useMemo } from 'react'
import { sound } from '../../utils/audioEngine'
import { useTheme } from '../../utils/themeContext'
import confetti from 'canvas-confetti'
import { Radio, Search, Calendar, MapPin, Check, ExternalLink } from 'lucide-react'

interface EventItem {
  id: string
  title: string
  category: 'Hackathon' | 'AI Meetup' | 'Workshop' | 'Conference'
  date: string
  location: string
  attendees: number
  isHot?: boolean
}

const SAMPLE_EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: 'Agentic AI Builders Hackathon 2026',
    category: 'Hackathon',
    date: 'MAY 24 · 09:00 IST',
    location: 'Bengaluru / Hybrid',
    attendees: 420,
    isHot: true,
  },
  {
    id: 'e2',
    title: 'Modern RAG & Vector Search Meetup',
    category: 'AI Meetup',
    date: 'JUN 02 · 18:30 IST',
    location: 'Delhi NCR',
    attendees: 180,
  },
  {
    id: 'e3',
    title: 'Distributed Systems & CI/CD Masterclass',
    category: 'Workshop',
    date: 'JUL 15 · 10:00 IST',
    location: 'Hyderabad / Remote',
    attendees: 310,
  },
  {
    id: 'e4',
    title: 'India AI Founders Summit 2026',
    category: 'Conference',
    date: 'AUG 18 · 09:30 IST',
    location: 'Bengaluru',
    attendees: 950,
    isHot: true,
  },
]

export function EventMeshRadar() {
  const { setCursorLabel } = useTheme()
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [rsvpdEvents, setRsvpdEvents] = useState<string[]>([])

  const filteredEvents = useMemo(() => {
    return SAMPLE_EVENTS.filter((e) => {
      const matchCat = selectedCategory === 'ALL' || e.category === selectedCategory
      const matchSearch =
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    })
  }, [selectedCategory, searchQuery])

  const handleRsvp = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    sound.playSuccess(0.08)
    if (!rsvpdEvents.includes(id)) {
      setRsvpdEvents([...rsvpdEvents, id])
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#ffffff', '#10B981'],
      })
    } else {
      setRsvpdEvents(rsvpdEvents.filter((item) => item !== id))
    }
  }

  return (
    <div className="w-full bg-[var(--bg-card)] border border-[var(--border-base)] p-5 sm:p-6 text-left flex flex-col gap-4 rounded-xl shadow-lg">
      {/* Header controls & Radar Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border-base)]">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-500 dark:text-emerald-400 animate-pulse" />
          <span className="font-mono text-xs font-bold text-[var(--text-primary)] tracking-wider uppercase">
            EVENTMESH // REAL-TIME DISCOVERY RADAR
          </span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events, cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-base)] text-xs text-[var(--text-primary)] font-mono placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--border-hover)] rounded-md w-44 sm:w-56"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {['ALL', 'Hackathon', 'AI Meetup', 'Workshop', 'Conference'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.playClick(850)
              setSelectedCategory(cat)
            }}
            className={`px-3 py-1 font-mono text-xs transition-colors cursor-pointer rounded-md ${
              selectedCategory === cat
                ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow-xs'
                : 'bg-[var(--bg-surface)] border border-[var(--border-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-h-[170px]">
        {filteredEvents.length === 0 ? (
          <div className="col-span-2 flex items-center justify-center p-8 font-mono text-xs text-[var(--text-muted)]">
            No active nodes matching your filter criteria.
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const isJoined = rsvpdEvents.includes(evt.id)
            return (
              <div
                key={evt.id}
                className="bg-[var(--bg-surface)]/80 border border-[var(--border-base)] hover:border-[var(--border-hover)] p-4 flex flex-col justify-between transition-all rounded-lg group relative backdrop-blur-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-[var(--bg-card)] border border-[var(--border-base)] text-[var(--text-secondary)] font-mono text-[11px] font-semibold uppercase tracking-wider rounded-md">
                      {evt.category}
                    </span>
                    {evt.isHot && (
                      <span className="font-mono text-[11px] text-orange-500 font-bold">
                        ● TRENDING
                      </span>
                    )}
                  </div>

                  <h4 className="font-display text-sm font-semibold text-[var(--text-primary)] transition-colors line-clamp-1 mb-2">
                    {evt.title}
                  </h4>

                  <div className="flex flex-col gap-1 font-mono text-xs text-[var(--text-muted)]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--border-base)] font-mono text-xs">
                  <span className="text-[var(--text-muted)]">{evt.attendees} builders</span>

                  <button
                    onClick={(e) => handleRsvp(evt.id, e)}
                    onMouseEnter={() => setCursorLabel(isJoined ? 'SAVED' : 'JOIN')}
                    onMouseLeave={() => setCursorLabel(null)}
                    className={`px-3 py-1 flex items-center gap-1.5 font-mono text-xs font-semibold transition-colors cursor-pointer rounded-md ${
                      isJoined
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 shadow-xs'
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>REGISTERED</span>
                      </>
                    ) : (
                      <>
                        <span>1-CLICK JOIN</span>
                        <ExternalLink className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
