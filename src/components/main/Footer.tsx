import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-12 mt-24 flex flex-col items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Votre Univers Déco</h3>
            <p className="text-sm text-gray-300">
              Transformez votre intérieur avec des meubles design et de qualité. Découvrez notre collection unique pour créer un espace qui vous ressemble.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" aria-label="Facebook">
                <FaFacebook className="text-gray-400 hover:text-white transition-colors" size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="text-gray-400 hover:text-white transition-colors" size={20} />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-gray-400 hover:text-white transition-colors" size={20} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin className="text-gray-400 hover:text-white transition-colors" size={20} />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Contactez-nous</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">
                Adresse: 123 Rue du Design, Paris, France
              </li>
              <li className="text-sm text-gray-300">
                Téléphone: +33 1 23 45 67 89
              </li>
              <li className="text-sm text-gray-300">
                Email: contact@votredeco.com
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 my-8" />
        <div className="text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Votre Univers Déco. Tous droits réservés.
          </p>
          <p>
            Conçu avec ❤️ par{" "}
            <a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              [Votre Nom]
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}