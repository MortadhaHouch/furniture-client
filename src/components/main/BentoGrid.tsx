import Link from "next/link";
import { Button } from "../ui/button";
import { MagicCard } from "../ui/magic-card";
import { ShowCase } from "../../../utils/types";
import { Sofa, Table, Bed, Briefcase, Lightbulb, TrendingUp, Star, Tag } from "lucide-react";
import { FaLocationArrow } from "react-icons/fa";

const categoryIcons: Record<string, JSX.Element> = {
	"prestige déco": <Star size={100} className="text-yellow-500" />,
	"Canapés et Fauteuils": <Sofa size={100} className="text-teal-500" />,
	"Tables et Chaises": <Table size={100} className="text-indigo-500" />,
	"Meubles de Chambre": <Bed size={100} className="text-pink-500" />,
	"Meubles de Bureau": <Briefcase size={100} className="text-blue-500" />,
	"Décoration et Accessoires": <Lightbulb size={100} className="text-green-500" />,
	"Nouveautés": <TrendingUp size={100} className="text-orange-500" />,
	"Promotions": <Tag size={100} className="text-red-500" />,
};

export default function BentoGrid({ items }: { items: ShowCase[] }) {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 w-[90%] max-w-7xl mx-auto auto-rows-[minmax(150px, 1fr)]">
            {items.map((item, idx) => (
                <MagicCard
                    key={idx}
                    className={`relative overflow-hidden rounded-3xl flex flex-col justify-center items-center text-center transition-transform duration-300 hover:scale-105 bg-gradient-to-tr from-gray-100 to-gray-200 shadow-lg ${
                        item.main ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                    }`}
                >
					{categoryIcons[item.title]}
					<h3 className="text-2xl font-bold mb-2 text-black dark:text-white">{item.title}</h3>
					<p className="text-base text-gray-600 mb-6">{item.description}</p>
					<Button className="bg-primary-600 text-black dark:text-white hover:bg-primary-700 px-4 py-2 rounded-lg transition-all duration-200">
						<FaLocationArrow size={20}/><Link href={item.href}>Explore</Link>
					</Button>
                </MagicCard>
            ))}
        </section>
    );
}
