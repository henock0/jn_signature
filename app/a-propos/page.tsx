// app/a-propos/page.tsx
export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-responsive">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6 text-center">
            À Propos de <span className="text-gold-primary">JN SIGNATURE</span>
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6 text-lg">
              JN Signature incarne l'excellence et l'élégance depuis sa création. 
              Notre mission est de vous offrir des pièces uniques qui reflètent 
              votre personnalité avec style et raffinement.
            </p>

            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Notre Histoire</h2>
            <p className="text-gray-600 mb-6">
              Fondée avec passion pour la mode et l'authenticité, JN Signature 
              s'est rapidement imposée comme une référence en matière de style 
              et de qualité. Chaque pièce est soigneusement sélectionnée pour 
              vous offrir le meilleur.
            </p>

            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "Qualité",
                  description: "Des matériaux premium et une confection soignée",
                  icon: "⭐"
                },
                {
                  title: "Authenticité",
                  description: "Des pièces uniques qui vous ressemblent",
                  icon: "💎"
                },
                {
                  title: "Service",
                  description: "Un accompagnement personnalisé pour chaque client",
                  icon: "🤝"
                }
              ].map((value, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-3">{value.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Notre Engagement</h2>
            <p className="text-gray-600 mb-6">
              Chez JN Signature, nous nous engageons à vous offrir une expérience 
              d'achat exceptionnelle, de la découverte de nos collections à la 
              livraison de vos articles préférés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}