import BentoGrid from "@/components/main/BentoGrid"
import { furnitureCategories, trends } from "../../../utils/constants"

export default function Products() {
  return (
    <main className='w-full min-h-screen flex flex-col justify-start items-center flex-wrap pt-28'>
      <h1 className='text-5xl font-bold'>Products</h1>
      <BentoGrid items={[...trends,...furnitureCategories]}/>
    </main>
  )
}
