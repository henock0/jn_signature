// app/livraison-retours/page.tsx
export default function ShippingReturns() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6 text-center">
            Livraison & Retours
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Livraison</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🚚 Livraison Standard</h3>
                  <p className="text-gray-600">Délai: 2-5 jours ouvrés</p>
                  <p className="text-gold-primary font-semibold">Gratuite</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">⚡ Livraison Express</h3>
                  <p className="text-gray-600">Délai: 24-48h</p>
                  <p className="text-gray-600">Frais: 9,90 €</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Retours & Échanges</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Vous disposez de <strong>14 jours</strong> à compter de la réception 
                  de votre commande pour effectuer un retour ou un échange.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Conditions</h3>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Les articles doivent être dans leur état d'origine</li>
                    <li>• Les étiquettes doivent être intactes</li>
                    <li>• L'emballage d'origine doit être conservé</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Processus de Retour</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    step: "1",
                    title: "Contactez-nous",
                    description: "Envoyez-nous un email avec votre numéro de commande"
                  },
                  {
                    step: "2",
                    title: "Préparez le colis",
                    description: "Remettez les articles dans leur emballage d'origine"
                  },
                  {
                    step: "3",
                    title: "Retournez",
                    description: "Déposez le colis au point relais indiqué"
                  }
                ].map((step, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gold-primary text-black rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}