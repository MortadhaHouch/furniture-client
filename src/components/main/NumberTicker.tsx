import { NumberTicker as NumberTickerComponent } from "../ui/number-ticker";

export function NumberTicker({value}:{value:number}) {
  return (
    <NumberTickerComponent
      value={value}
      className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
    />
  );
}
