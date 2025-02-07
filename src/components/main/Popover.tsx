import {
    Popover as PopoverComponent,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  

export default function Popover() {
  return (
    <PopoverComponent>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
    </PopoverComponent>
  )
}
