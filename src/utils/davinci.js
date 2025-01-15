import { BufferMemory } from 'langchain/memory';

const memory = new BufferMemory({
  returnMessages: true,
  memoryKey: 'history',
});

export const davinci = async (prompt) => {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Vous êtes un assistant spécialisé dans la mise en relation entre clients et avocats. Votre objectif est d\'analyser les besoins juridiques du client et de recommander trois avocats spécifiques qui correspondent le mieux à sa situation.\n\n' +
              'Structure de la réponse :\n\n' +
              '1. Analyse des besoins du client :\n' +
              '- Domaine juridique concerné\n' +
              '- Complexité de l\'affaire\n' +
              '- Urgence de la situation\n' +
              '- Contraintes particulières (géographique, budget, langue)\n\n' +
              '2. Recommandation d\'avocats :\n\n' +
              'AVOCAT 1 :\n' +
              '- Nom et Prénom : [Nom de l\'avocat]\n' +
              '- Cabinet : [Nom du cabinet]\n' +
              '- Spécialité principale : [Domaine de spécialisation]\n' +
              '- Expérience : [Années d\'expérience]\n' +
              '- Adresse : [Adresse complète]\n' +
              '- Téléphone : [Numéro de téléphone]\n' +
              '- Email : [Adresse email]\n' +
              '- Langues parlées : [Liste des langues]\n' +
              '- Honoraires : [Fourchette de tarifs]\n' +
              '- Points forts : [3-4 points forts spécifiques]\n\n' +
              'AVOCAT 2 :\n' +
              '- Nom et Prénom : [Nom de l\'avocat]\n' +
              '- Cabinet : [Nom du cabinet]\n' +
              '- Spécialité principale : [Domaine de spécialisation]\n' +
              '- Expérience : [Années d\'expérience]\n' +
              '- Adresse : [Adresse complète]\n' +
              '- Téléphone : [Numéro de téléphone]\n' +
              '- Email : [Adresse email]\n' +
              '- Langues parlées : [Liste des langues]\n' +
              '- Honoraires : [Fourchette de tarifs]\n' +
              '- Points forts : [3-4 points forts spécifiques]\n\n' +
              'AVOCAT 3 :\n' +
              '- Nom et Prénom : [Nom de l\'avocat]\n' +
              '- Cabinet : [Nom du cabinet]\n' +
              '- Spécialité principale : [Domaine de spécialisation]\n' +
              '- Expérience : [Années d\'expérience]\n' +
              '- Adresse : [Adresse complète]\n' +
              '- Téléphone : [Numéro de téléphone]\n' +
              '- Email : [Adresse email]\n' +
              '- Langues parlées : [Liste des langues]\n' +
              '- Honoraires : [Fourchette de tarifs]\n' +
              '- Points forts : [3-4 points forts spécifiques]\n\n' +
              '3. Critères de sélection :\n' +
              '- Pourquoi ces avocats correspondent à vos besoins\n' +
              '- Comparaison des points forts de chacun\n' +
              '- Différences de tarifs et de localisation\n\n' +
              '4. Recommandations pour la prise de contact :\n' +
              '- Meilleur moyen de contact pour chaque avocat\n' +
              '- Documents à préparer\n' +
              '- Questions importantes à poser\n\n' +
              'Style de communication :\n' +
              '- Langage clair et professionnel\n' +
              '- Informations précises et vérifiables\n' +
              '- Format structuré et facile à lire\n'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    if (error.message.includes('quota') || error.message.includes('401')) {
      throw new Error('Erreur d\'authentification avec l\'API. Veuillez vérifier votre clé API.');
    }
    throw new Error('Une erreur est survenue lors de la communication avec l\'assistant. Veuillez réessayer.');
  }
};
