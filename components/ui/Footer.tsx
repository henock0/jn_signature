// src/components/ui/Footer.tsx - Version finale
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description JN SIGNATURE */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 relative">
                <img 
                  src="/images/logo.png" 
                  alt="JN SIGNATURE"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-serif font-bold">JN SIGNATURE</span>
                <p className="text-sm text-gold-light">Votre style, notre signature</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              JN SIGNATURE incarne l'excellence et l'élégance. Découvrez nos collections 
              exclusives de vêtements, chaussures et accessoires soigneusement 
              sélectionnés pour vous offrir le meilleur du style.
            </p>
            <div className="flex space-x-4">
              {[
                { name: 'Facebook', icon: '📘', href: '#' },
                { name: 'Instagram', icon: '📷', href: '#' },
                { name: 'WhatsApp', icon: '💬', href: '#' }
              ].map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-gold-primary transition-colors flex items-center space-x-2"
                >
                  <span>{social.icon}</span>
                  <span className="text-sm">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-primary">Boutique</h3>
            <ul className="space-y-2">
              {[
                { name: 'Nouveautés', href: '/boutique?nouveaute=true' },
                { name: 'Vêtements Homme', href: '/boutique?categorie=Vêtements Homme' },
                { name: 'Vêtements Femme', href: '/boutique?categorie=Vêtements Femme' },
                { name: 'Chaussures', href: '/boutique?categorie=Chaussures' },
                { name: 'Accessoires', href: '/boutique?categorie=Accessoires' },
                { name: 'Parfums', href: '/boutique?categorie=Parfums' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service client */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold-primary">Assistance</h3>
            <ul className="space-y-2">
              {[
                { name: 'Contact', href: '/contact' },
                { name: 'Livraison', href: '/contact?sujet=livraison' },
                { name: 'Retours & Échanges', href: '/contact?sujet=retour' },
                { name: 'Guide des tailles', href: '#' },
                { name: 'FAQ', href: '/contact' },
                { name: 'À propos', href: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section avantages */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { 
                title: 'Livraison Rapide', 
                desc: 'Expédition sous 24h',
                icon: '🚚'
              },
              { 
                title: 'Paiement Sécurisé', 
                desc: 'Transaction safe',
                icon: '🔒'
              },
              { 
                title: 'Retour Gratuit', 
                desc: 'Sous 14 jours',
                icon: '↩️'
              },
              { 
                title: 'Support 7j/7', 
                desc: 'Service client',
                icon: '💬'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-semibold text-gold-light text-sm">{item.title}</h4>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section inférieure */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} <span className="text-gold-primary">JN SIGNATURE</span>. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[
              { name: 'Mentions légales', href: '#' },
              { name: 'Confidentialité', href: '#' },
              { name: 'CGV', href: '#' },
              { name: 'Cookies', href: '#' }
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-gold-primary text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}