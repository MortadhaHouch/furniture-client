import {
    Accordion as AccordionComponent,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function Accordion({title,children}:{title:string,children:React.ReactNode}) {
    return (
        <AccordionComponent type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>
                    {children}
                </AccordionContent>
            </AccordionItem>
        </AccordionComponent>
    )
}
