import { useNavigate } from 'react-router-dom'
import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'
import { motion } from 'framer-motion'

// SVG visual for DI Notes — interactive learning visualization
function DiNotesVisual() {
  return (
    <svg
      viewBox="0 0 320 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Background */}
      <rect width="320" height="180" fill="rgba(255,255,255,0.02)" />

      {/* Grid lines */}
      <g opacity="0.06">
        <line x1="64" y1="0" x2="64" y2="180" stroke="white" strokeWidth="1" />
        <line x1="160" y1="0" x2="160" y2="180" stroke="white" strokeWidth="1" />
        <line x1="256" y1="0" x2="256" y2="180" stroke="white" strokeWidth="1" />
        <line x1="0" y1="45" x2="320" y2="45" stroke="white" strokeWidth="1" />
        <line x1="0" y1="90" x2="320" y2="90" stroke="white" strokeWidth="1" />
        <line x1="0" y1="135" x2="320" y2="135" stroke="white" strokeWidth="1" />
      </g>

      {/* Curve path */}
      <motion.path
        d="M 30 130 Q 80 40, 160 90 T 290 60"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      />

      {/* Secondary curve */}
      <motion.path
        d="M 30 140 Q 80 60, 160 100 T 290 75"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        strokeDasharray="4 6"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      />

      {/* Interactive node */}
      <motion.circle
        cx="160" cy="90" r="5"
        fill="white"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="160" cy="90" r="12"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.1 }}
      />

      {/* Labels */}
      <text x="22" y="22" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="rgba(255,255,255,0.4)" fontWeight="500">
        x = 0.5  α = 1.2
      </text>
      <text x="22" y="168" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="rgba(255,255,255,0.25)">
        REALTIME RE-RENDER // READY
      </text>
    </svg>
  )
}

// SVG visual for Event Mesh — event aggregator visualization
function EventMeshVisual() {
  return (
    <svg
      viewBox="0 0 320 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <rect width="320" height="180" fill="rgba(255,255,255,0.02)" />

      {/* Hackathon chip */}
      <motion.rect
        x="24" y="28" width="110" height="46"
        rx="4"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      <text x="38" y="47" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="rgba(255,255,255,0.5)" fontWeight="700">HACKATHON</text>
      <text x="38" y="63" fontFamily="'JetBrains Mono', monospace" fontSize="12" fill="white" fontWeight="700">MAY 24</text>

      {/* Meetup chip */}
      <motion.rect
        x="150" y="28" width="110" height="46"
        rx="4"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />
      <text x="164" y="47" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="rgba(255,255,255,0.4)" fontWeight="700">MEETUP</text>
      <text x="164" y="63" fontFamily="'JetBrains Mono', monospace" fontSize="12" fill="rgba(255,255,255,0.7)" fontWeight="700">JUN 02</text>

      {/* Connector lines */}
      <motion.line
        x1="134" y1="51" x2="150" y2="51"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        strokeDasharray="3 4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
      <motion.line
        x1="79" y1="74" x2="79" y2="120"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.6 }}
      />
      <motion.circle
        cx="79" cy="120" r="3"
        fill="rgba(255,255,255,0.4)"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      />

      {/* Workshop chip */}
      <motion.rect
        x="24" y="132" width="110" height="36"
        rx="4"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
      />
      <text x="38" y="148" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="rgba(255,255,255,0.4)" fontWeight="700">WORKSHOP</text>
      <text x="38" y="160" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill="rgba(255,255,255,0.6)">JUL 15</text>

      <text x="150" y="160" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="rgba(255,255,255,0.2)">
        AGGREGATED // 1-CLICK JOIN
      </text>
    </svg>
  )
}

interface ProductCardProps {
  name: string
  category: string
  tags: string[]
  description: string
  descriptionSide: 'left' | 'right'
  visual: React.ReactNode
}

function ProductCard({ name, category, tags, description, descriptionSide, visual }: ProductCardProps) {
  const navigate = useNavigate()

  const descBlock = (
    <div className={`flex flex-col gap-5 justify-center ${descriptionSide === 'left' ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}`}>
      <p
        className="text-c3 text-sm leading-relaxed"
        style={{ fontFamily: 'var(--font-body)', maxWidth: '30ch' }}
      >
        {description}
      </p>
      <div className={`flex flex-wrap gap-2 ${descriptionSide === 'left' ? 'lg:justify-end' : 'lg:justify-start'}`}>
        {tags.map((tag) => (
          <span key={tag} className="tag-chip">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )

  const cardBlock = (
    <motion.button
      onClick={() => navigate('/coming-soon')}
      className="product-card w-full group"
      whileHover="hover"
      initial="rest"
      animate="rest"
      role="link"
      aria-label={`Explore ${name} — click to visit`}
    >
      {/* Top hint */}
      <motion.p
        className="font-mono text-[0.58rem] tracking-[0.14em] text-c3 text-right mb-5"
        style={{ fontFamily: 'var(--font-mono)' }}
        variants={{
          rest: { opacity: 0.5 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.2 }}
      >
        → CLICK TO EXPLORE
      </motion.p>

      {/* SVG Visual */}
      <motion.div
        className="w-full mb-6 overflow-hidden"
        style={{ height: '180px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.01)' }}
        variants={{
          rest: { borderColor: 'rgba(255,255,255,0.07)' },
          hover: { borderColor: 'rgba(255,255,255,0.15)' },
        }}
        transition={{ duration: 0.25 }}
      >
        {visual}
      </motion.div>

      {/* Product name */}
      <h3
        className="font-display font-bold text-c2 mb-2"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}
      >
        {name}
      </h3>

      {/* Category tag */}
      <p
        className="font-mono text-xs tracking-[0.1em] text-c3"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {category}
      </p>
    </motion.button>
  )

  return (
    <div
      className={`flex flex-col gap-8 ${descriptionSide === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:items-start`}
    >
      <div className="w-full lg:w-48 shrink-0">
        {descBlock}
      </div>
      <div className="w-full flex-1">
        {cardBlock}
      </div>
    </div>
  )
}

/**
 * Products section — two product cards in a vertical stack with alternating layouts.
 * DI Notes: description left of card.
 * Event Mesh: description right of card.
 * Both clickable → /coming-soon placeholder.
 */
export function Products() {
  return (
    <section
      id="products"
      className="min-h-screen bg-c1 py-24 md:py-36"
      aria-labelledby="products-headline"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header row */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-12 gap-4">
          <ScrollReveal delay={0}>
            <SectionEyebrow index="03" label="PRODUCTS" />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="section-index">( 2 ACTIVE PRODUCTS )</p>
          </ScrollReveal>
        </div>

        {/* Headline */}
        <ScrollReveal delay={0.1}>
          <h2
            id="products-headline"
            className="text-section-h font-display font-bold text-c2 mb-20"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Products that<br />actually ship.
          </h2>
        </ScrollReveal>

        {/* Products */}
        <div className="flex flex-col gap-20">
          {/* Product 1: DI Notes */}
          <ScrollReveal delay={0.2}>
            <ProductCard
              name="DI Notes"
              category="/ INTERACTIVE LEARNING"
              tags={['Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Quick Sort']}
              description="Concepts you can touch. Every lesson comes with a live playground — change an input, watch the output."
              descriptionSide="left"
              visual={<DiNotesVisual />}
            />
          </ScrollReveal>

          {/* Hairline divider */}
          <ScrollReveal delay={0.25}>
            <div className="hairline" />
          </ScrollReveal>

          {/* Product 2: Event Mesh */}
          <ScrollReveal delay={0.3}>
            <ProductCard
              name="Event Mesh"
              category="/ EVENT AGGREGATOR"
              tags={['Hackathons', 'Meetups', 'Workshops', 'Conferences']}
              description="Hackathons, meetups, and workshops across India — in one place. Filter, find, and show up."
              descriptionSide="right"
              visual={<EventMeshVisual />}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
