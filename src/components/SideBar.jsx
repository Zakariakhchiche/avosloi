import { useContext } from 'react';
import { MdAdd } from 'react-icons/md';
import { ChatContext } from '../context/chatContext';

const SideBar = () => {
  const { messages, setMessages } = useContext(ChatContext);

  const clearChat = () => {
    setMessages([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const inputElement = document.querySelector('input[type="text"]');
    if (inputElement) {
      inputElement.value = '';
    }
  };

  return (
    <div className="sidebar w-full md:w-64 p-4 bg-blue-900 text-white h-fit lg:h-screen">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">AVOSLOI</h1>
        </div>
        <button
          onClick={clearChat}
          className="w-full px-4 py-2 mb-4 text-sm font-medium bg-[#385986] rounded-lg hover:bg-blue-800 flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105"
        >
          <MdAdd className="text-lg" /> Nouvelle consultation
        </button>
        <div className="p-4 bg-[#385986] rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Guide d'utilisation</h2>
          <ul className="text-sm space-y-2">
            <li>• Décrivez votre situation juridique</li>
            <li>• Précisez vos critères (budget, lieu...)</li>
            <li>• Recevez 3 recommandations d'avocats</li>
            <li>• Comparez les profils proposés</li>
          </ul>
        </div>
        <div className="mt-auto pt-4 border-t border-[#385986]">
          <p className="text-xs text-center">&copy; 2025 AVOSLOI - Tous droits réservés</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

