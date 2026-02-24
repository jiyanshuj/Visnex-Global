import React, { useMemo, useState } from 'react';
import './ai-assistant.css';

const starterPrompts = [
  'Mere startup ke liye go-to-market plan banao',
  'Investor pitch deck ke liye 10 slide outline do',
  'Meri website copy ko improve karo',
];

const getReply = (message) => {
  const text = message.toLowerCase();

  if (text.includes('pitch')) {
    return 'Pitch deck flow: Problem, Solution, Market Size, Product Demo, Business Model, Traction, Competition, GTM, Financials, Ask.';
  }

  if (text.includes('gtm') || text.includes('go-to-market')) {
    return 'Quick GTM plan: ICP define karo, 2 acquisition channels choose karo, 30-day content + outreach sprint run karo, weekly CAC/LTV track karo.';
  }

  if (text.includes('copy') || text.includes('website')) {
    return 'Homepage copy formula: Clear headline + value proposition + proof + CTA. Har section me ek primary action rakho.';
  }

  return 'Main help kar sakta hoon: GTM strategy, pitch deck, growth ideas, aur content planning. Aap specific goal likho.';
};

const AiAssistantPage = ({ setCurrentPage }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Namaste, main aapka AI Assistant hoon. Aaj kis goal par kaam karna hai?',
    },
  ]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const sendMessage = () => {
    const value = input.trim();
    if (!value) return;

    const userMsg = { id: `u-${Date.now()}`, role: 'user', text: value };
    const assistantMsg = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      text: getReply(value),
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
  };

  return (
    <div className="ai-page min-h-screen pt-24 pb-8 px-4 md:px-8 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="ai-header mb-6 rounded-2xl border border-orange-500/30 p-5 md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">AI Assistant</h1>
              <p className="text-sm md:text-base text-gray-300 mt-1">
                Startup planning, pitch prep, growth strategy aur content support.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage('home')}
              className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 hover:border-orange-500/50"
            >
              Back Home
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="rounded-2xl border border-gray-800 bg-gray-950 p-4">
            <h2 className="font-semibold mb-3">Quick Prompts</h2>
            <div className="flex flex-col gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setInput(prompt)}
                  className="text-left text-sm px-3 py-2 rounded-lg bg-black border border-gray-800 hover:border-orange-500/40"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </aside>

          <section className="rounded-2xl border border-gray-800 bg-black/70">
            <div className="h-[420px] overflow-y-auto p-4 md:p-5 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`ai-bubble ${
                    message.role === 'user' ? 'ai-user ml-auto' : 'ai-assistant'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 p-4 flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') sendMessage();
                }}
                placeholder="Type your question..."
                className="flex-1 rounded-lg bg-gray-950 border border-gray-700 px-3 py-2 outline-none focus:border-orange-500"
              />
              <button
                type="button"
                disabled={!canSend}
                onClick={sendMessage}
                className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AiAssistantPage;
