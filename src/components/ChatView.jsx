import { useState, useRef, useEffect, useContext } from 'react';
import Message from './Message';
import { ChatContext } from '../context/chatContext';
import Thinking from './Thinking';
import { MdSend } from 'react-icons/md';
import LawyerFilters from './LawyerFilters';
import FavoriteLawyers from './FavoriteLawyers';

const template = [
  {
    title: 'Avocat en droit du travail',
    prompt: "Je recherche un avocat spécialisé en droit du travail à Paris pour un licenciement abusif. Mon budget est de 200-300€/heure. J'ai besoin de quelqu'un qui parle anglais car certains documents sont en anglais. Urgence modérée, je souhaite démarrer la procédure dans les 2 semaines.",
  },
  {
    title: 'Avocat en droit immobilier',
    prompt: "Je cherche un avocat en droit immobilier à Lyon pour un litige avec mon promoteur concernant des malfaçons. Budget jusqu'à 250€/heure. Je préfère un cabinet avec une forte expérience en contentieux de la construction. Disponibilité souhaitée dans le mois.",
  },
  {
    title: 'Avocat en droit des affaires',
    prompt: "Je recherche un avocat d'affaires à Bordeaux pour accompagner la création de ma startup tech. Critères importants :\n- Expérience avec les startups\n- Connaissance du droit du numérique\n- Budget : 200-400€/heure\n- Anglais courant requis\n- Disponible pour un premier RDV la semaine prochaine",
  },
  {
    title: 'Avocat en droit de la famille',
    prompt: "Je cherche un avocat spécialisé en droit de la famille à Marseille pour un divorce à l'amiable. Budget maximum 200€/heure. Je souhaite quelqu'un de conciliant et d'expérimenté en médiation. Pas d'urgence particulière mais je souhaite démarrer la procédure dans les 3 mois.",
  },
  {
    title: 'Avocat en droit pénal',
    prompt: "Recherche urgente d'un avocat pénaliste à Toulouse. Affaire de délit routier. Budget non limité. Besoin d'une grande disponibilité et d'une expérience significative dans ce type de dossiers. Premier rendez-vous souhaité dans les 48h si possible.",
  },
];

const ChatView = () => {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [formValue, setFormValue] = useState('');
  const { messages, addMessage, loading } = useContext(ChatContext);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex-none p-4 bg-neutral text-neutral-content">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Trouvez l&apos;avocat idéal</h2>
          <button onClick={() => setShowFavorites(!showFavorites)} className="btn btn-ghost btn-sm">
            {showFavorites ? 'Voir les messages' : 'Voir les favoris'}
          </button>
        </div>
      </div>

      <LawyerFilters onFilterChange={() => {}} />

      <div className="flex-grow overflow-y-auto p-2 sm:p-4">
        {showFavorites ? <FavoriteLawyers /> : (
          <div className="flex flex-col space-y-4">
            {messages.length ? (
              messages.map((message, index) => (
                <Message key={index} message={message} />
              ))
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {template.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg shadow-sm hover:shadow-md cursor-pointer" 
                       onClick={() => setFormValue(item.prompt)}>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.prompt}</p>
                  </div>
                ))}
              </div>
            )}

            {loading && <Thinking />}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <form className="flex flex-col sm:flex-row gap-2" 
          onSubmit={(e) => {
            e.preventDefault();
            if (!formValue.trim()) return;

            addMessage({ role: 'user', content: formValue });
            setFormValue('');
          }}
        >
          <textarea
            ref={inputRef}
            className="textarea textarea-bordered border-[#385986] flex-grow bg-[#edf0f3] resize-none leading-6"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Posez votre question ici..."
          />
          <button type="submit" className="btn bg-[#385986]" disabled={!formValue}>
            <MdSend size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatView;
