import {
    Sheet as SheetComponent,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import React from 'react'

export default function Sheet({children,trigger,title}:{children:React.ReactNode,trigger:React.ReactNode,title:string}) {
    return (
        <SheetComponent>
            <SheetTrigger>{trigger}</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>{title}</SheetTitle>
                <SheetDescription>
                    {children}
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </SheetComponent>
    )
}
