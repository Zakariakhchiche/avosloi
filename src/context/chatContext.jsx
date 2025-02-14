import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * ChatContext is a context object that is used to share collection of messages
 * between components
 */
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [loading, setLoading] = useState(false); // ✅ Ajout de l'état de chargement

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = async (message) => {
    setMessages(prevMessages => [...prevMessages, message]);

    if (message.role === 'user') {
      setLoading(true); // ✅ Active l'indicateur "Thinking"

      try {
        const responseMessage = await fetchDeepSeekResponse(message.content);
        setMessages(prevMessages => [...prevMessages, responseMessage]);
      } catch (error) {
        console.error("Erreur lors de la requête à DeepSeek :", error);
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'assistant', content: "Une erreur s'est produite, veuillez réessayer." }
        ]);
      } finally {
        setLoading(false); // ✅ Désactive "Thinking"
      }
    }
  };

  const fetchDeepSeekResponse = async (userMessage) => {
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

  return (
    <ChatContext.Provider value={{ messages, setMessages, addMessage, loading }}>
      {children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
