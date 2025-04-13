'use client';

import { signIn } from "next-auth/react"

export default function Home() {
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
