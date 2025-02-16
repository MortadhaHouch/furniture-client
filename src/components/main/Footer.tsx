import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full py-12 mt-24 flex flex-col items-center bg-slate-400 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">prestige déco</h3>
            <p className="text-sm">
              Transformez votre intérieur avec des meubles design et de qualité. Découvrez notre collection unique pour créer un espace qui vous ressemble.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" aria-label="Facebook">
                <FaFacebook className="transition-colors" size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="transition-colors" size={20} />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="transition-colors" size={20} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin className="transition-colors" size={20} />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Contactez-nous</h3>
            <ul className="space-y-2">
              <li className="text-sm">
                Adresse: 123 Rue du Design, Paris, France
              </li>
              <li className="text-sm">
                Téléphone: +33 1 23 45 67 89
              </li>
              <li className="text-sm">
                Email: contact@votredeco.com
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 my-8" />
        <div className="text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Votre Univers Déco. Tous droits réservés.
          </p>
          <p>
            Conçu avec ❤️ par{" "}
            <a
              href="https://mortadha-houch.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Mortadha Houch
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}