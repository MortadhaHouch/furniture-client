import React from 'react'
import { User as UserType } from '../../../utils/types'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { GoArrowUpRight, GoCopy } from 'react-icons/go'
import Link from 'next/link'
import { Avatar } from './Avatar'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdOutlineMail } from 'react-icons/md'
import { CiUser } from 'react-icons/ci'

export default function User({user}:{user:UserType}) {
    if(user){
        return (
            <Card className='flex flex-col justify-between items-center w-[clamp(250px,30%,280px)] aspect-square p-2 border border-gray-200 rounded-md shadow-md'>
                <CardHeader className='w-full flex justify-center items-center'>
                    <Avatar username={`${user.firstName} ${user.lastName}`} src={user.avatar} fallbackClassName='text-2xl'/>
                    <div className='w-full flex justify-between items-center gap-2'><CiUser /><h2 className='w-full'>{user.firstName} {user.lastName}</h2></div>
                    <div className='w-full flex justify-between items-center gap-2'><MdOutlineMail/><p className='w-full'>{user.email}</p></div>
                    <div className='w-full flex justify-between items-center gap-2'><FaPhoneAlt /><span className='w-full'>{user?.phone?<GoCopy/>:'unconnu'}</span></div>
                </CardHeader>
                <CardContent className='flex flex-col gap-2 justify-center items-center'>
                    <span className={`w-full text-start ${user.card?.length > 0?'text-green-500':'text-red-500'}`}>{user.card?.length} produits achètés</span>
                    <span className={`w-full text-start ${user.savedProducts?.length > 0?'text-green-500':'text-red-500'}`}>{user.savedProducts?.length} produits marqués</span>
                </CardContent>
                <CardFooter className='w-full'>
                    <Button className='w-full'>
                        <Link href={`/dashboard/utilisateurs/${user.id}`} className='w-full flex flex-row justify-center items-center gap-2'>
                            <GoArrowUpRight /><span>Voir plus</span>
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        )
    }else{
        return (
            <div className='flex flex-col justify-center items-center'>
                <p>Utilisateur non trouvé</p>
            </div>
        );
    }
}
