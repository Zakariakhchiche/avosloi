import { useState } from 'react';
import ChatView from './components/ChatView';
import SideBar from './components/SideBar';
import { ChatContextProvider } from './context/chatContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ChatContextProvider>
      <div className="app-container">
        <div className="flex">
          <SideBar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 py-8">
              <ChatView />
            </div>
          </div>
        </div>
      </div>
    </ChatContextProvider>
  );
}

export default App;
