import { useState, useEffect, useRef, useCallback } from 'react'
import { sound } from '../../utils/audioEngine'
import { useTheme } from '../../utils/themeContext'
import { Play, Pause, FastForward, Shuffle, Code2 } from 'lucide-react'

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
    code: string[]
    description: string
  }
> = {
  bubble: {
    name: 'Bubble Sort',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if in wrong order.',
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
    description: 'Finds the minimum element from the unsorted sub-array and places it at the beginning.',
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
    description: 'Divides array around a pivot element into smaller sub-arrays and recursively sorts.',
    code: [
      'function quickSort(arr, low, high):',
      '  if low < high:',
      '    pivot = partition(arr, low, high)',
      '    quickSort(arr, low, pivot-1)',
      '    quickSort(arr, pivot+1, high)',
    ],
  },
}

export function DiNotesVisualizer() {
  const { setCursorLabel } = useTheme()
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble')
  const [arraySize] = useState<number>(14)
  const [array, setArray] = useState<number[]>([35, 12, 68, 85, 24, 95, 45, 18, 72, 50, 30, 90, 10, 60])
  const [comparing, setComparing] = useState<number[]>([])
  const [swapping, setSwapping] = useState<number[]>([])
  const [sortedIndices, setSortedIndices] = useState<number[]>([])
  const [activeCodeLine, setActiveCodeLine] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(120)

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
    const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 85) + 12)
    setArray(newArr)
    setComparing([])
    setSwapping([])
    setSortedIndices([])
    setActiveCodeLine(0)
    stepsRef.current = generateSteps(newArr, algorithm)
    currentStepIdxRef.current = 0
  }, [arraySize, algorithm, generateSteps])

  useEffect(() => {
    reset()
  }, [algorithm, reset])

  const applyStep = (step: SortStep) => {
    setArray(step.array)
    setComparing(step.comparing)
    setSwapping(step.swapping)
    setSortedIndices(step.sorted)
    setActiveCodeLine(step.activeLine)

    if (step.swapping.length > 0) {
      const val = step.array[step.swapping[0]] || 50
      sound.playTone(220 + val * 7, 0.05, 0.03)
    } else if (step.comparing.length > 0) {
      const val = step.array[step.comparing[0]] || 40
      sound.playTone(180 + val * 5, 0.03, 0.015)
    }
  }

  const stepForward = () => {
    sound.playClick(900)
    if (currentStepIdxRef.current < stepsRef.current.length - 1) {
      currentStepIdxRef.current++
      applyStep(stepsRef.current[currentStepIdxRef.current])
    } else {
      setIsPlaying(false)
      sound.playSuccess(0.08)
    }
  }

  const togglePlay = () => {
    sound.playClick(850)
    if (isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current)
      setIsPlaying(false)
    } else {
      if (currentStepIdxRef.current >= stepsRef.current.length - 1) {
        reset()
      }
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        if (currentStepIdxRef.current < stepsRef.current.length - 1) {
          currentStepIdxRef.current++
          applyStep(stepsRef.current[currentStepIdxRef.current])
        } else {
          setIsPlaying(false)
          sound.playSuccess(0.08)
          if (timerRef.current) clearInterval(timerRef.current)
        }
      }, speed)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, speed])

  return (
    <div className="w-full bg-[var(--bg-card)] border border-[var(--border-base)] p-5 md:p-6 text-left flex flex-col gap-5 rounded-sm">
      {/* Top Bar: Selector & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-base)]">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-[#3B82F6]" />
          <span className="font-mono text-xs font-bold text-[var(--text-primary)] tracking-wider uppercase">
            DI NOTES // INTERACTIVE DSA ENGINE
          </span>
        </div>

        {/* Algorithm Tabs */}
        <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-1 border border-[var(--border-base)] rounded-xs">
          {(['bubble', 'selection', 'quick'] as const).map((algo) => (
            <button
              key={algo}
              onClick={() => {
                sound.playClick(900)
                setAlgorithm(algo)
              }}
              className={`px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider transition-colors cursor-pointer rounded-xs ${
                algorithm === algo
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {ALGORITHMS[algo].name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Visualizer Slate & Synchronized Code */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Bars Container */}
        <div className="md:col-span-8 bg-[var(--bg-surface)] border border-[var(--border-base)] p-4 h-[180px] flex items-end justify-between gap-1.5 rounded-xs relative overflow-hidden">
          {array.map((val, idx) => {
            const isComparing = comparing.includes(idx)
            const isSwapping = swapping.includes(idx)
            const isSorted = sortedIndices.includes(idx)

            let barColor = 'rgba(128, 128, 128, 0.3)'
            if (isSwapping) barColor = 'var(--accent-primary, #E2001A)'
            else if (isComparing) barColor = '#3B82F6'
            else if (isSorted) barColor = 'rgba(16, 185, 129, 0.8)'

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center justify-end h-full transition-all duration-75"
              >
                <span className="font-mono text-[0.55rem] text-[var(--text-muted)] mb-1 hidden sm:block">
                  {val}
                </span>
                <div
                  className="w-full rounded-t-xs transition-all duration-75"
                  style={{
                    height: `${val}%`,
                    backgroundColor: barColor,
                    boxShadow: isSwapping ? '0 0 10px var(--accent-primary, #E2001A)' : 'none',
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Live Code Highlighter */}
        <div className="md:col-span-4 bg-[var(--bg-surface)] border border-[var(--border-base)] p-3 h-[180px] font-mono text-[0.65rem] flex flex-col justify-center rounded-xs overflow-hidden">
          <div className="text-[var(--text-muted)] text-[0.58rem] tracking-wider mb-1.5 uppercase">
            // EXECUTION TRACE
          </div>
          {ALGORITHMS[algorithm].code.map((line, idx) => (
            <div
              key={idx}
              className={`px-1.5 py-0.5 rounded-xs transition-colors duration-100 ${
                activeCodeLine === idx
                  ? 'bg-blue-500/20 text-blue-600 dark:text-blue-300 font-semibold border-l-2 border-blue-500'
                  : 'text-[var(--text-muted)] opacity-70'
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-base)] font-mono text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            onMouseEnter={() => setCursorLabel(isPlaying ? 'PAUSE' : 'PLAY')}
            onMouseLeave={() => setCursorLabel(null)}
            className="px-3.5 py-1.5 bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer rounded-xs"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>RUN SORT</span>
              </>
            )}
          </button>

          <button
            onClick={stepForward}
            disabled={isPlaying}
            onMouseEnter={() => setCursorLabel('STEP')}
            onMouseLeave={() => setCursorLabel(null)}
            className="px-3 py-1.5 border border-[var(--border-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] flex items-center gap-1.5 bg-[var(--bg-surface)] transition-colors cursor-pointer disabled:opacity-40 rounded-xs"
          >
            <FastForward className="w-3 h-3" />
            <span>STEP</span>
          </button>

          <button
            onClick={reset}
            onMouseEnter={() => setCursorLabel('SHUFFLE')}
            onMouseLeave={() => setCursorLabel(null)}
            className="p-1.5 border border-[var(--border-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] bg-[var(--bg-surface)] transition-colors cursor-pointer rounded-xs"
            title="Shuffle Array"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-2 text-[var(--text-muted)] text-[0.68rem]">
          <span>Speed:</span>
          <input
            type="range"
            min="30"
            max="300"
            step="10"
            value={330 - speed}
            onChange={(e) => setSpeed(330 - parseInt(e.target.value))}
            className="w-20 accent-blue-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}
