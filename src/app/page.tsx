'use client';

import { useState, FormEventHandler, useRef, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Home() {
  const { data: session } = useSession();
  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // 新しいメッセージが追加されたら自動スクロール
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // テキストエリアの高さを自動調整
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputText]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    
    if (!inputText.trim()) return;
    
    const userInputCopy = inputText.trim(); // 入力テキストのコピーを保存
    
    // 先にフォームをクリア
    setInputText('');
    
    // テキストエリアの高さをリセット
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    const userMessage = { role: 'user' as const, content: userInputCopy };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summaries`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText: userInputCopy }),
      });
    
      const data = await response.json();
      const assistantMessage = { 
        role: 'assistant' as const, 
        content: data.response_text || '申し訳ありません、応答を生成できませんでした。'
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('エラーが発生しました:', error);
      const errorMessage = { 
        role: 'assistant' as const, 
        content: '申し訳ありません、リクエストの処理中にエラーが発生しました。'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      
      // フォームをリセット（念のため）
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // 強制的に入力フィールドをクリア
      setTimeout(() => {
        setInputText('');
      }, 0);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  // Enterキーで送信（Shift+Enterは改行）
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isLoading && inputText.trim()) {
      event.preventDefault();
      handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  if (session) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
        {/* ヘッダー部分 */}
        <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 py-3 px-4 bg-white dark:bg-zinc-900">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <h1 className="font-bold text-lg bg-gradient-to-r from-zinc-600 to-zinc-900 dark:from-zinc-300 dark:to-zinc-100 bg-clip-text text-transparent">
              IR アシスタント
            </h1>
            <button 
              onClick={() => signOut()} 
              className="px-3 py-1 text-sm rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              サインアウト
            </button>
          </div>
        </header>

        {/* メッセージ履歴 */}
        <div className="flex-1 overflow-y-auto p-4 sm:px-6 md:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto pt-4 pb-24">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[50vh] flex-col">
                <div className="text-4xl font-bold mb-6 bg-gradient-to-r from-zinc-600 to-zinc-900 dark:from-zinc-300 dark:to-zinc-100 bg-clip-text text-transparent">
                  IR アシスタント
                </div>
                <p className="text-gray-500 text-center max-w-md">
                  企業のIR情報について質問してください。財務状況、業績、戦略など、企業情報に関する質問にお答えします。
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-6 ${
                    message.role === 'assistant' ? 'mr-4' : 'ml-4'
                  }`}
                >
                  <div className="flex items-start">
                    {/* アイコン */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                      message.role === 'assistant' 
                        ? 'bg-zinc-700 dark:bg-zinc-300 text-white dark:text-zinc-900' 
                        : 'bg-zinc-200 dark:bg-zinc-700'
                    }`}>
                      {message.role === 'assistant' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      )}
                    </div>
                    
                    {/* メッセージ本文 */}
                    <div className={`p-4 rounded-2xl max-w-[85%] ${
                      message.role === 'assistant' 
                        ? 'bg-zinc-100 dark:bg-zinc-800' 
                        : 'bg-zinc-700 dark:bg-zinc-200 text-white dark:text-zinc-900'
                    }`}>
                      <div className="whitespace-pre-wrap break-words">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
  
        {/* 入力フォーム（下部に固定） */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="max-w-3xl mx-auto">
            <form ref={formRef} onSubmit={handleSubmit} className="relative">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="メッセージを入力..."
                className="w-full p-4 pr-14 border border-gray-300 dark:border-gray-700 focus:border-zinc-500 dark:focus:border-zinc-400 bg-white dark:bg-zinc-800 rounded-xl focus:outline-none resize-none min-h-[56px] max-h-[120px] text-gray-900 dark:text-gray-100"
                rows={1}
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="absolute right-3 bottom-3 p-2 rounded-full bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                )}
              </button>
            </form>
            <div className="text-xs text-center mt-2 text-gray-500">
              Enterキーで送信、Shift+Enterで改行
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
      <div className="text-center p-8 max-w-md">
        <div className="text-4xl font-bold mb-6 bg-gradient-to-r from-zinc-600 to-zinc-900 dark:from-zinc-300 dark:to-zinc-100 bg-clip-text text-transparent">
          IR アシスタント
        </div>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          企業の財務情報や業績に関する質問にお答えします。続けるにはサインインしてください。
        </p>
        <button 
          onClick={() => signIn()} 
          className="px-6 py-3 bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-700 dark:hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
        >
          サインイン
        </button>
      </div>
    </div>
  )
}
