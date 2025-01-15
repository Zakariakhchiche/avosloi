import { useState, useRef, useEffect, useContext } from 'react';
import Message from './Message';
import { ChatContext } from '../context/chatContext';
import Thinking from './Thinking';
import { MdSend } from 'react-icons/md';
import LawyerFilters from './LawyerFilters';
import FavoriteLawyers from './FavoriteLawyers';
import { davinci } from '../utils/davinci';

const template = [
  {
    title: 'Avocat en droit du travail',
    prompt: 'Je recherche un avocat spécialisé en droit du travail à Paris pour un licenciement abusif. Mon budget est de 200-300€/heure. J\'ai besoin de quelqu\'un qui parle anglais car certains documents sont en anglais. Urgence modérée, je souhaite démarrer la procédure dans les 2 semaines.',
  },
  {
    title: 'Avocat en droit immobilier',
    prompt: 'Je cherche un avocat en droit immobilier à Lyon pour un litige avec mon promoteur concernant des malfaçons. Budget jusqu\'à 250€/heure. Je préfère un cabinet avec une forte expérience en contentieux de la construction. Disponibilité souhaitée dans le mois.',
  },
  {
    title: 'Avocat en droit des affaires',
    prompt: 'Je recherche un avocat d\'affaires à Bordeaux pour accompagner la création de ma startup tech. Critères importants :\n- Expérience avec les startups\n- Connaissance du droit du numérique\n- Budget : 200-400€/heure\n- Anglais courant requis\n- Disponible pour un premier RDV la semaine prochaine',
  },
  {
    title: 'Avocat en droit de la famille',
    prompt: 'Je cherche un avocat spécialisé en droit de la famille à Marseille pour un divorce à l\'amiable. Budget maximum 200€/heure. Je souhaite quelqu\'un de conciliant et d\'expérimenté en médiation. Pas d\'urgence particulière mais je souhaite démarrer la procédure dans les 3 mois.',
  },
  {
    title: 'Avocat en droit pénal',
    prompt: 'Recherche urgente d\'un avocat pénaliste à Toulouse. Affaire de délit routier. Budget non limité. Besoin d\'une grande disponibilité et d\'une expérience significative dans ce type de dossiers. Premier rendez-vous souhaité dans les 48h si possible.',
  },
];

const ChatView = () => {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [formValue, setFormValue] = useState('');
  const [loading, setLoading] = useState(false);
  const { messages, addMessage } = useContext(ChatContext);
  const [showFavorites, setShowFavorites] = useState(false);
  const [filters, setFilters] = useState({
    specialty: '',
    city: '',
    priceRange: '',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (newFilters.specialty || newFilters.city || newFilters.priceRange) {
      const prompt = `Je cherche un avocat${newFilters.specialty ? ` spécialisé en ${newFilters.specialty}` : ''}${
        newFilters.city ? ` à ${newFilters.city}` : ''
      }${newFilters.priceRange ? ` avec un budget ${newFilters.priceRange}€/heure` : ''}.`;
      setFormValue(prompt);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!formValue.trim()) return;

    addMessage({
      role: 'user',
      content: formValue,
    });

    setLoading(true);
    setFormValue('');

    try {
      const response = await davinci(formValue);
      addMessage({
        role: 'assistant',
        content: response,
      });
    } catch (error) {
      console.error('Error:', error);
      addMessage({
        role: 'assistant',
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-base-100">
      <div className="flex-none p-4 bg-neutral text-neutral-content">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Trouvez l'avocat idéal pour votre situation</h2>
            <p className="text-sm opacity-90">Décrivez vos besoins et critères pour obtenir des recommandations personnalisées</p>
          </div>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="btn btn-ghost btn-sm"
          >
            {showFavorites ? 'Voir les messages' : 'Voir les favoris'}
          </button>
        </div>
      </div>

      <LawyerFilters onFilterChange={handleFilterChange} />

      <div className="flex-grow overflow-y-auto p-2 sm:p-6">
        <div className="flex flex-col space-y-4 max-w-4xl mx-auto">
          {showFavorites ? (
            <FavoriteLawyers />
          ) : (
            <>
              {messages.length ? (
                messages.map((message, index) => (
                  <Message key={index} message={message} />
                ))
              ) : (
                <div className="flex my-2">
                  <div className="w-full">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mx-2 sm:mx-10">
                      {template.map((item, index) => (
                        <li
                          onClick={() => setFormValue(item.prompt)}
                          key={index}
                          className="p-4 sm:p-6 border rounded-lg border-slate-300 hover:border-slate-500 cursor-pointer transition-colors">
                          <p className="text-base font-semibold">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.prompt}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {loading && <Thinking />}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      <div className="p-2 sm:p-6 border-t bg-base-100">
        <div className="max-w-4xl mx-auto">
          <form className="flex flex-col sm:flex-row gap-2 sm:gap-4" onSubmit={sendMessage}>
            <div className="flex-grow relative">
              <input
                ref={inputRef}
                type="text"
                className="input input-bordered w-full pr-10 text-base sm:text-lg"
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Posez votre question ici..."
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-circle btn-ghost btn-sm"
                disabled={!formValue}>
                <MdSend size={20} />
              </button>
            </div>
          </form>
          <div className="mt-2 text-xs sm:text-sm text-gray-500 text-center">
            Les réponses sont générées automatiquement. Pour toute question juridique importante, veuillez consulter un avocat ou un professionnel du droit qualifié.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
