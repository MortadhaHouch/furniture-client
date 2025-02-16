const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    numbers: /[0-9]/,
    specialChars: /[!@#$%^&*(),.?":{}|<>]/,
    minLength: 8,
    maxLength: 20
};
const phoneNumberRegex = /^\+216(2|3|4|5|7|8|9)[0-9]{7}$/;
const categories:string[] = [
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Bathroom",
    "Dining Room",
    "Office",
    "Garden",
    "Storage",
    "Children's Room",
    "Outdoor",
    "Other"
]
type Notification = {
    id: string;
    userId: string;
    type: "PRODUCT_ADDED" | "REVIEW_ADDED" | "ORDER_PLACED" | "ORDER_CANCELED";
    message: string;
    createdAt: Date;
    read: boolean;
    product?: {
        id: string;
        name: string;
        price: number;
    };
}
type User = {
    lastName:string
    email:string
    avatar:string
    password:string
    firstName:string
    role:UserRole
    address:string
    phone:number
    card:[]
    savedProducts:Product[]
    timestamps:{
        createdAt: Date
    },
    id:string,
    isLoggedIn:boolean
}
type Product = {
    name:string
    price:number
    description:string
    category:string
    images:string[]
    quantity:number
    sold:number
    reviews:
    {
        userId:string,
        comment:string,
        rating:number
        createdAt:Date
    }[]
    id:string
    status:OrderStatus
    createdAt:Date
}
enum OrderStatus {
    PENDING='PENDING',
    COMPLETED='COMPLETED',
    CANCELLED='CANCELLED'
}
enum UserRole {
    ADMIN="ADMIN",
    USER="USER",
    SUPER_ADMIN="SUPER_ADMIN"
}
type Message = {
    id: string
    from: User
    to:User
    message: string
    createdAt: Date
    read: boolean
}
enum CategoryNavLinks {
    SOFAS="/produits/canapes-fauteuils",
    TABLES="/produits/tables-chaises",
    ROOMS="/produits/meubles-chambres",
    BUREAUS="/produits/meubles-bureau",
    DECO="/produits/decoration-accessoires",
    SMALL_SPACES="/produits/meubles-petits-espaces",
}
type ShowCase = {
    title: string;
    href: string;
    description: string;
    main?:boolean;
    image: string;
}
enum OrderTypeSlug {
    SUCCESSFUL="succès",
    ORDER_CANCELED="annulées",
    ORDER_PENDING="en-attente",
}
enum OrderType {
    SUCCESSFUL="SUCCESSFUL",
    CANCELED="CANCELED",
    PENDING="PENDING",
}
enum LoadingProps {
    ERROR="ERROR",
    LOADING="LOADING",
    LOGIN="LOGIN",
}
enum AuthErrorType {
    USER_ERROR = "USER_ERROR",
    CRED_ERROR = "CRED_ERROR"
}
type UserStats = {
    user:number,
    isVerified:boolean,
    ongoing:number,
    completed:number,
    cancelled:number,
    savedProducts:Product[]
}
type DispatchType =
| {
    type: "LOGIN";
    payload: {
        token: string;
        userData: User;
        role: UserRole;
    };
}
| {
    type: "LOGOUT";
    payload: null;
};
type Category = {
    name: string;
    description: string;
    image?: string;
}
type Order = {
    id: string;
    user:{
        id: string;
        firstName: string;
        lastName: string;
    },
    count:number
    name:string,
    totalPrice:number
}
export type {Notification,User,Product,Message,ShowCase,UserStats,DispatchType,Category,Order}
export {emailRegex,categories,UserRole,CategoryNavLinks,OrderTypeSlug,OrderType,LoadingProps,AuthErrorType,passwordRegex,OrderStatus,phoneNumberRegex}