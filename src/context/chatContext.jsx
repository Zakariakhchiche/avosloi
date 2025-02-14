import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * ChatContext is a context object that is used to share collection of messages
 * between components
 */
export const ChatContext = createContext();

/**
 * ChatContextProvider is a functional component that serves as a provider for the ChatContext.
 * It provides the ChatContext to the components within its subtree.
 *
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} A ChatContext.Provider element.
 */
export const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  // Sauvegarder les messages dans le localStorage
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = async (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  
    // Si le message est de l'utilisateur, envoyer la requête à ChatGPT
    if (message.role === 'user') {
      try {
        const responseMessage = await fetchChatGPTResponse(message.content);
        setMessages(prevMessages => [...prevMessages, responseMessage]);
      } catch (error) {
        console.error("Erreur lors de la requête à ChatGPT :", error);
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'assistant', content: "Une erreur s'est produite, veuillez réessayer." }
        ]);
      }
    }
  };

  const fetchChatGPTResponse = async (userMessage) => {
    const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
  
    if (!DEEPSEEK_API_KEY) {
      console.error("Clé API DeepSeek manquante !");
      return { role: "assistant", content: "Erreur : Clé API manquante." };
    }
  
    try {
      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: "Tu es un assistant expert en fiscalité." },
            { role: "user", content: userMessage }
          ]
        })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`Erreur API DeepSeek: ${data.error?.message || response.statusText}`);
      }
  
      return {
        role: "assistant",
        content: data.choices[0].message.content
      };
    } catch (error) {
      console.error("Erreur DeepSeek :", error);
      return {
        role: "assistant",
        content: "Je ne peux pas répondre pour le moment, réessayez plus tard."
      };
    }
  };
  
  
  

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      setMessages, 
      addMessage,
      clearMessages
    }}>
      {children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
