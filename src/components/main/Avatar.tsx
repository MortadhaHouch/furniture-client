import {
    Avatar as AvatarComponent,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function Avatar({src,username,fallbackClassName}:{src:string,username:string,fallbackClassName?:string}) {
    return (
        <AvatarComponent className="border border-green-500 flex justify-center items-center">
            <AvatarImage src={src} alt={username}/>
            <AvatarFallback className={fallbackClassName}>{username.split(" ")[0][0]+username.split(" ")[1][0]}</AvatarFallback>
        </AvatarComponent>
    )
}
