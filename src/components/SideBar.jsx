import { useContext } from 'react';
import { MdAdd } from 'react-icons/md';
import { ChatContext } from '../context/chatContext';

const SideBar = () => {
  const { messages, setMessages } = useContext(ChatContext);

  const clearChat = () => {
    setMessages([]);
    // Scroll to top after clearing
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Clear input if any
    const inputElement = document.querySelector('input[type="text"]');
    if (inputElement) {
      inputElement.value = '';
    }
  };

  return (
    <div className="sidebar w-64 p-4">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">AVOSLOI</h1>
            <p className="text-sm text-blue-200">Assistant Juridique Intelligent</p>
          </div>
        </div>

        <div className="flex-1">
          <button
            onClick={clearChat}
            className="w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105"
          >
            <MdAdd className="text-lg" />
            Nouvelle consultation
          </button>

          <div className="p-4 bg-blue-800 rounded-lg">
            <h2 className="text-lg font-semibold text-white mb-2">Guide d'utilisation</h2>
            <ul className="text-sm text-blue-200 space-y-2">
              <li>• Décrivez votre situation juridique</li>
              <li>• Précisez vos critères (budget, lieu...)</li>
              <li>• Recevez 3 recommandations d'avocats</li>
              <li>• Comparez les profils proposés</li>
            </ul>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-blue-700">
          <p className="text-xs text-blue-200 text-center">
            &copy; 2025 AVOSLOI - Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
