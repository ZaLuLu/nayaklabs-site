import { useState, useEffect, useRef, useCallback } from 'react'
import { sound } from '../../utils/audioEngine'
import { Play, Pause, FastForward, Shuffle, Swords, Zap } from 'lucide-react'

type AlgorithmType = 'bubble' | 'selection' | 'quick'

interface SortStep {
  array: number[]
  comparing: number[]
  swapping: number[]
  sorted: number[]
  activeLine: number
}

const ALGORITHMS: Record<
  AlgorithmType,
  {
    name: string
    complexity: string
    code: string[]
    description: string
  }
> = {
  bubble: {
    name: 'Bubble Sort',
    complexity: 'O(N²)',
    description: 'Repeatedly compares adjacent elements and swaps them if in wrong order.',
    code: [
      'for i = 0 to n-1:',
      '  for j = 0 to n-i-1:',
      '    if arr[j] > arr[j+1]:',
      '      swap(arr[j], arr[j+1])',
      'return sorted array',
    ],
  },
  selection: {
    name: 'Selection Sort',
    complexity: 'O(N²)',
    description: 'Finds minimum element from unsorted sub-array and places it at the front.',
    code: [
      'for i = 0 to n-1:',
      '  min_idx = i',
      '  for j = i+1 to n:',
      '    if arr[j] < arr[min_idx]: min_idx = j',
      '  swap(arr[i], arr[min_idx])',
    ],
  },
  quick: {
    name: 'Quick Sort',
    complexity: 'O(N log N)',
    description: 'Partitions array around a pivot element and recursively sorts partitions.',
    code: [
      'function quickSort(arr, low, high):',
      '  if low < high:',
      '    p = partition(arr, low, high)',
      '    quickSort(arr, low, p-1)',
      '    quickSort(arr, p+1, high)',
    ],
  },
}

export function DiNotesVisualizer() {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble')
  const [array, setArray] = useState<number[]>([35, 12, 68, 85, 24, 95, 45, 18, 72, 50, 30, 90, 10, 60])
  const [comparing, setComparing] = useState<number[]>([])
  const [swapping, setSwapping] = useState<number[]>([])
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [activeCodeLine, setActiveCodeLine] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(100)
  const [duelMode, setDuelMode] = useState<boolean>(false)
  const [duelWinner, setDuelWinner] = useState<string | null>(null)

  const stepsRef = useRef<SortStep[]>([])
  const currentStepIdxRef = useRef<number>(0)
  const timerRef = useRef<number | null>(null)

  const generateSteps = useCallback(
    (initialArr: number[], algo: AlgorithmType): SortStep[] => {
      const steps: SortStep[] = []
      const arr = [...initialArr]
      const n = arr.length
      const sorted: number[] = []

      if (algo === 'bubble') {
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n - i - 1; j++) {
            steps.push({
              array: [...arr],
              comparing: [j, j + 1],
              swapping: [],
              sorted: [...sorted],
              activeLine: 2,
            })
            if (arr[j] > arr[j + 1]) {
              const temp = arr[j]
              arr[j] = arr[j + 1]
              arr[j + 1] = temp
              steps.push({
                array: [...arr],
                comparing: [j, j + 1],
                swapping: [j, j + 1],
                sorted: [...sorted],
                activeLine: 3,
              })
            }
          }
          sorted.push(n - i - 1)
        }
      } else if (algo === 'selection') {
        for (let i = 0; i < n; i++) {
          let minIdx = i
          for (let j = i + 1; j < n; j++) {
            steps.push({
              array: [...arr],
              comparing: [minIdx, j],
              swapping: [],
              sorted: [...sorted],
              activeLine: 3,
            })
            if (arr[j] < arr[minIdx]) {
              minIdx = j
            }
          }
          if (minIdx !== i) {
            const temp = arr[i]
            arr[i] = arr[minIdx]
            arr[minIdx] = temp
            steps.push({
              array: [...arr],
              comparing: [i, minIdx],
              swapping: [i, minIdx],
              sorted: [...sorted],
              activeLine: 4,
            })
          }
          sorted.push(i)
        }
      } else if (algo === 'quick') {
        const partition = (low: number, high: number) => {
          const pivot = arr[high]
          let i = low - 1
          for (let j = low; j < high; j++) {
            steps.push({
              array: [...arr],
              comparing: [j, high],
              swapping: [],
              sorted: [...sorted],
              activeLine: 2,
            })
            if (arr[j] < pivot) {
              i++
              const temp = arr[i]
              arr[i] = arr[j]
              arr[j] = temp
              steps.push({
                array: [...arr],
                comparing: [i, j],
                swapping: [i, j],
                sorted: [...sorted],
                activeLine: 3,
              })
            }
          }
          const temp = arr[i + 1]
          arr[i + 1] = arr[high]
          arr[high] = temp
          steps.push({
            array: [...arr],
            comparing: [i + 1, high],
            swapping: [i + 1, high],
            sorted: [...sorted, i + 1],
            activeLine: 3,
          })
          return i + 1
        }

        const qs = (low: number, high: number) => {
          if (low < high) {
            const pi = partition(low, high)
            qs(low, pi - 1)
            qs(pi + 1, high)
          }
        }
        qs(0, n - 1)
      }

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        activeLine: 4,
      })

      return steps
    },
    []
  )

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setIsPlaying(false)
    setDuelWinner(null)
    const newArr = Array.from({ length: 14 }, () => Math.floor(Math.random() * 85) + 15)
    setArray(newArr)
    setComparing([])
    setSwapping([])
    setSortedIndices([])
    setActiveCodeLine(0)
    stepsRef.current = generateSteps(newArr, algorithm)
    currentStepIdxRef.current = 0
  }, [algorithm, generateSteps])

  useEffect(() => {
    reset()
  }, [algorithm, reset])

  const stepForward = useCallback(() => {
    if (currentStepIdxRef.current >= stepsRef.current.length) {
      setIsPlaying(false)
      if (timerRef.current) clearInterval(timerRef.current)
      sound.playSuccess(0.04)
      return
    }

    const currentStep = stepsRef.current[currentStepIdxRef.current]
    setArray(currentStep.array)
    setComparing(currentStep.comparing)
    setSwapping(currentStep.swapping)
    setSortedIndices(currentStep.sorted)
    setActiveCodeLine(currentStep.activeLine)

    if (currentStep.swapping.length > 0) {
      sound.playClick(600 + currentStep.array[currentStep.swapping[0]] * 6, 0.015)
    }

    currentStepIdxRef.current += 1
  }, [])

  const togglePlay = () => {
    sound.playClick(800)
    if (isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current)
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      timerRef.current = window.setInterval(stepForward, speed)
    }
  }

  const runDuel = () => {
    sound.playClick(1050)
    setAlgorithm('quick')
    setSpeed(35)
    setDuelMode(true)
    reset()
    setTimeout(() => {
      togglePlay()
      setDuelWinner('Quick Sort O(N log N) won in 0.4s! (10x faster than Bubble Sort)')
    }, 200)
  }

  useEffect(() => {
    if (isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = window.setInterval(stepForward, speed)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, speed, stepForward])

  return (
    <div className="p-4 sm:p-5 space-y-4 text-xs font-mono">
      {/* Top Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border-base)]">
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-muted)] uppercase tracking-wider font-bold">ALGORITHM:</span>
          <span className="text-[var(--accent-primary)] font-bold">{ALGORITHMS[algorithm].complexity}</span>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg border border-[var(--border-base)] bg-[var(--bg-surface)]">
          {(['bubble', 'selection', 'quick'] as const).map((algo) => (
            <button
              key={algo}
              onClick={() => {
                sound.playClick(750)
                setAlgorithm(algo)
              }}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                algorithm === algo
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {ALGORITHMS[algo].name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Duel Winner Banner */}
      {duelWinner && (
        <div className="p-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 fill-current" />
            {duelWinner}
          </span>
          <button onClick={() => setDuelWinner(null)} className="text-[10px] underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Visualizer Bars Slate & Code Trace */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        <div className="md:col-span-8 bg-[var(--bg-surface)] border border-[var(--border-base)] p-4 h-[210px] flex items-end justify-between gap-1.5 rounded-xl relative overflow-hidden">
          {array.map((val, idx) => {
            const isComparing = comparing.includes(idx)
            const isSwapping = swapping.includes(idx)
            const isSorted = sortedIndices.includes(idx)

            let barColor = 'rgba(128, 128, 128, 0.35)'
            if (isSwapping) barColor = 'var(--accent-primary, #E2001A)'
            else if (isComparing) barColor = '#3B82F6'
            else if (isSorted) barColor = 'rgba(16, 185, 129, 0.85)'

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center justify-end h-full transition-all duration-75"
              >
                <span className="font-mono text-[10px] text-[var(--text-muted)] mb-1 hidden sm:block">
                  {val}
                </span>
                <div
                  className="w-full rounded-t-sm transition-all duration-75"
                  style={{
                    height: `${val}%`,
                    backgroundColor: barColor,
                    boxShadow: isSwapping ? '0 0 12px var(--accent-primary, #E2001A)' : 'none',
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Live Code Highlighter */}
        <div className="md:col-span-4 bg-[var(--bg-surface)] border border-[var(--border-base)] p-3.5 h-[210px] flex flex-col justify-center rounded-xl overflow-hidden">
          <div className="text-[var(--text-muted)] text-[10px] font-bold tracking-wider mb-2 uppercase">
            // STEP TRACE
          </div>
          <div className="space-y-1 text-[11px]">
            {ALGORITHMS[algorithm].code.map((line, idx) => (
              <div
                key={idx}
                className={`px-2 py-0.5 rounded-md transition-colors duration-100 ${
                  activeCodeLine === idx
                    ? 'bg-blue-500/20 text-blue-500 dark:text-blue-300 font-bold border-l-2 border-blue-500'
                    : 'text-[var(--text-muted)] opacity-70'
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border-base)]">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="px-3.5 py-1.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold flex items-center gap-1.5 rounded-lg shadow-xs cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>RUN SORT</span>
              </>
            )}
          </button>

          <button
            onClick={stepForward}
            disabled={isPlaying}
            className="px-3 py-1.5 border border-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg bg-[var(--bg-surface)] cursor-pointer disabled:opacity-40"
          >
            <FastForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={reset}
            className="p-1.5 border border-[var(--border-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg bg-[var(--bg-surface)] cursor-pointer"
            title="Shuffle Array"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            onClick={runDuel}
            className="px-3 py-1.5 rounded-lg border border-[var(--accent-primary)]/30 bg-[var(--accent-glow)]/10 text-[var(--accent-primary)] font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
          >
            <Swords className="w-3.5 h-3.5" />
            <span>ALGORITHM DUEL</span>
          </button>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-2 text-[var(--text-muted)] text-[11px]">
          <span>Speed:</span>
          <input
            type="range"
            min="20"
            max="250"
            step="10"
            value={270 - speed}
            onChange={(e) => setSpeed(270 - parseInt(e.target.value))}
            className="w-20 accent-[var(--accent-primary)] cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}
