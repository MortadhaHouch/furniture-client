"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Import icons for the toggle button
import { cn } from "@/lib/utils";
import {
  NavigationMenu as NavigationMenuComponent,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const furnitureCategories: { title: string; href: string; description: string }[] = [
  {
    title: "Canapés et Fauteuils",
    href: "/canapes-fauteuils",
    description: "Découvrez des canapés et fauteuils confortables et élégants pour votre salon.",
  },
  {
    title: "Tables et Chaises",
    href: "/tables-chaises",
    description: "Trouvez la table parfaite pour vos repas et des chaises design pour compléter votre espace.",
  },
  {
    title: "Meubles de Chambre",
    href: "/meubles-chambre",
    description: "Lits, armoires et commodes pour créer une chambre à coucher cosy et fonctionnelle.",
  },
  {
    title: "Meubles de Bureau",
    href: "/meubles-bureau",
    description: "Des solutions ergonomiques et stylées pour votre espace de travail.",
  },
  {
    title: "Décoration et Accessoires",
    href: "/decoration-accessoires",
    description: "Lampes, miroirs et objets déco pour ajouter une touche personnelle à votre intérieur.",
  },
  {
    title: "Meubles pour Petits Espaces",
    href: "/meubles-petits-espaces",
    description: "Des meubles intelligents et compacts pour optimiser les petits espaces.",
  },
];

export function NavigationMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Menu */}
      <NavigationMenuComponent
        className={cn(
          "hidden md:flex", // Hide on mobile, show on desktop
          isMobileMenuOpen && "block absolute top-12 left-0 w-full bg-white shadow-lg z-50" // Show on mobile when toggled
        )}
      >
        <NavigationMenuList className="flex flex-col md:flex-row">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Nos Collections</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        [Nom de la Boutique]
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Des meubles design et de qualité pour transformer votre intérieur.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/nouveautes" title="Nouveautés">
                  Découvrez nos dernières arrivées et les tendances du moment.
                </ListItem>
                <ListItem href="/best-sellers" title="Best-sellers">
                  Les préférés de nos clients, des pièces incontournables.
                </ListItem>
                <ListItem href="/promotions" title="Promotions">
                  Profitez de nos offres spéciales et économisez sur vos meubles préférés.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Catégories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {furnitureCategories.map((category) => (
                  <ListItem
                    key={category.title}
                    title={category.title}
                    href={category.href}
                  >
                    {category.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuComponent>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";