import { cn } from "cn"

/**
 * A single-choice question laid out as ruled tiles. Native radios underneath,
 * so arrow keys and screen readers treat it as one group.
 */
export function ChoiceGroup({
  legend,
  name,
  options,
  value,
  onChange,
  minTileWidth = 140,
}: {
  legend: string
  name: string
  options: readonly string[]
  value: string
  onChange: (value: string) => void
  minTileWidth?: number
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-xs text-foreground/70">{legend}</legend>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${minTileWidth}px, 1fr))` }}
      >
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              "flex min-h-12 cursor-pointer items-center border-2 px-3.5 text-[15px] font-semibold tabular-nums transition-colors hover:border-brand",
              "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
              value === option ? "border-foreground bg-foreground text-background" : "border-divider",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
