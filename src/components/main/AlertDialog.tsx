import {
    AlertDialog as AlertDialogComponent,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import clsx from "clsx"
  

export default function AlertDialog({trigger,title,children,className,containerClassName,action,actionHandler}:{trigger:React.ReactNode,title:string,children:React.ReactNode,className?:string,containerClassName?:string,action:string,actionHandler:()=>void}) {
    return (
        <AlertDialogComponent>
            <AlertDialogTrigger className={clsx(className)}>{trigger}</AlertDialogTrigger>
            <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogContent className={clsx(containerClassName)}>
                <AlertDialogDescription className="w-full h-full">
                    {children}
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={actionHandler}>{action}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogComponent>
    )
}
