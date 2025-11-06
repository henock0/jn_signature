// src/app/contact/page.tsx
'use client';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi du message
    alert('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
    setFormData({ nom: '', email: '', telephone: '', sujet: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Contactez-<span className="text-gold-primary">Nous</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Une question ? Un conseil ? Notre équipe est là pour vous accompagner
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Envoyez-nous un message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                    placeholder="Votre numéro"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet *
                </label>
                <select
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                >
                  <option value="">Choisissez un sujet</option>
                  <option value="question-produit">Question sur un produit</option>
                  <option value="commande">Suivi de commande</option>
                  <option value="livraison">Question livraison</option>
                  <option value="retour">Retour & Échange</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold-primary focus:border-transparent"
                  placeholder="Décrivez votre demande..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold-primary text-black py-4 rounded-lg font-semibold hover:bg-gold-light transition-colors text-lg"
              >
                Envoyer le message
              </button>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="space-y-8">
            {/* Coordonnées */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">
                Nos Coordonnées
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gold-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Adresse</h4>
                    <p className="text-gray-600">Visitez-nous en boutique pour découvrir toute notre collection</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gold-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Téléphone</h4>
                    <p className="text-gray-600">Contactez-nous pour toute question</p>
                    <p className="text-gold-primary font-semibold">Disponible sur WhatsApp</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gold-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">contact@jnsignature.com</p>
                    <p className="text-sm text-gray-500">Réponse sous 24h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">
                Horaires d'Ouverture
              </h3>
              
              <div className="space-y-3">
                {[
                  { jour: 'Lundi - Vendredi', heures: '9:00 - 19:00' },
                  { jour: 'Samedi', heures: '9:00 - 18:00' },
                  { jour: 'Dimanche', heures: '10:00 - 16:00' }
                ].map((horaire, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-700">{horaire.jour}</span>
                    <span className="text-gold-primary font-semibold">{horaire.heures}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Rapide */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">
                Questions Fréquentes
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    question: "Quels sont les délais de livraison ?",
                    reponse: "Livraison sous 2-5 jours ouvrés selon votre localisation"
                  },
                  {
                    question: "Puis-je essayer les vêtements ?",
                    reponse: "Oui, visite en boutique sur rendez-vous pour essayer"
                  },
                  {
                    question: "Acceptez-vous les retours ?",
                    reponse: "Retours sous 14 jours pour les articles non portés"
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-l-4 border-gold-primary pl-4">
                    <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                    <p className="text-gray-600 text-sm mt-1">{faq.reponse}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}