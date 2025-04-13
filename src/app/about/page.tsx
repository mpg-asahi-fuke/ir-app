'use client';

import { useEffect } from 'react';

export default function Home() {
  // 簡単なスクロールアニメーション効果を追加
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });
    
    const hiddenElements = document.querySelectorAll('.fade-in');
    hiddenElements.forEach((el) => observer.observe(el));
    
    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200">
      {/* ヒーローセクション - モノクロ基調のエレガントなデザイン */}
      <section className="relative px-4 pt-24 pb-16 sm:px-6 md:px-8 overflow-hidden">
        {/* 装飾的な背景要素 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-zinc-700"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gray-100/50 dark:bg-zinc-800/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gray-100/50 dark:bg-zinc-800/30 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto text-center relative fade-in">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 rounded-full">企業分析を革新する</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-gray-800 dark:text-white">
            IR情報アシスタント
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
            企業の本質を瞬時に理解するための<span className="text-gray-800 dark:text-white font-medium">最先端AI</span>パートナー
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="/" className="px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg shadow-lg hover:translate-y-[-2px] transition-all">
              今すぐ始める
            </a>
          </div>
        </div>
      </section>

      {/* 問題提起セクション - モノトーンでのカードデザイン */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              「財務情報の海に溺れていませんか？」
            </h2>
            <div className="w-20 h-1 bg-gray-300 dark:bg-gray-600 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed text-lg text-center max-w-3xl mx-auto">
            企業のIR情報には、その会社の真の姿が映し出されています。経営陣のビジョン、成長戦略、リスク要因、そして未来への展望。これらの情報は投資判断や転職先選びに不可欠です。
          </p>
          
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-zinc-800 transform hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">しかし現実は...</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              多くのビジネスパーソンにとって、分厚い決算資料やIRプレゼンテーションは「読むべきだとわかっていても、時間も専門知識も足りず、結局後回し」になっているものです。結果として、<span className="font-medium text-gray-800 dark:text-white">貴重な情報を見逃し、機会損失</span>につながっています。
            </p>
          </div>
        </div>
      </section>

      {/* ソリューションセクション - モノトーンカード */}
      <section className="py-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
        <div className="fade-in">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 rounded-full">革新的ソリューション</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              そこで私たちは考えました
            </h2>
            <div className="w-20 h-1 bg-gray-300 dark:bg-gray-600 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-12 leading-relaxed text-lg text-center max-w-3xl mx-auto">
            最新のAI技術を活用し、<a href="https://s.kabutan.jp/disclosures/?category_group=accounting" className="text-gray-800 dark:text-gray-300 underline hover:text-gray-600 dark:hover:text-white transition-colors font-medium">株探の開示資料</a>のデータをベースに、Claude搭載のRAGシステムを開発。これにより
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-800 group hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-700 dark:text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">経営者の真意を数秒で抽出</h3>
              <p className="text-gray-600 dark:text-gray-400">長い説明文から重要なメッセージだけを即座に把握。本当に伝えたいことだけが明確に見えます。</p>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-800 group hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-700 dark:text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">業績の裏にある本質的な要因を即座に理解</h3>
              <p className="text-gray-600 dark:text-gray-400">表面的な数字だけでなく、その背景にある真因を解析。市場環境とのコンテキストも提供します。</p>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-800 group hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-700 dark:text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">競合他社との差別化ポイントを一目で把握</h3>
              <p className="text-gray-600 dark:text-gray-400">市場における自社のポジショニングを明確に理解。競争優位性を簡潔にまとめます。</p>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-zinc-800 group hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-700 dark:text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">関連部門の戦略をピンポイントで確認</h3>
              <p className="text-gray-600 dark:text-gray-400">あなたに関係する情報だけを効率的に抽出。部門ごとの優先事項が明確になります。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ベネフィットセクション - モノトーンで高級感のあるデザイン */}
      <section className="py-20 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 fade-in">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-gray-400 rounded-full">あらゆる人に価値を</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
              このツールがもたらすもの
            </h2>
            <div className="w-20 h-1 bg-gray-300 dark:bg-gray-600 mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="h-1 bg-gray-200 dark:bg-zinc-700"></div>
              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-700 dark:text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">社内の方へ</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  経営層の意思決定の背景を深く理解し、自分のキャリアパスや日々の業務に活かせます。「何となく」ではなく「なぜそうなのか」を理解した上で行動できるように。
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="h-1 bg-gray-200 dark:bg-zinc-700"></div>
              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-700 dark:text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">投資家の方へ</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  表面的な数字だけでなく、その裏にある戦略や課題を短時間で把握。より確信を持った投資判断ができます。成長ストーリーを正確に評価できるようになります。
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="h-1 bg-gray-200 dark:bg-zinc-700"></div>
              <div className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-700 dark:text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">転職を検討している方へ</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  興味ある企業の真の姿を素早く理解し、自分のスキルや価値観との相性を判断できます。企業文化や将来の展望を深く理解した上で選択できます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* フッターメッセージ - モノクロ基調でエレガントに */}
      <section className="py-24 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto text-center fade-in">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
          情報は力なり。活用できてこそ価値がある。
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
          私たちは、眠っていたIR情報の力を解き放ち、すべてのビジネスパーソンの意思決定を支えます。
        </p>
        <div className="mt-12">
          <a href="/" className="px-8 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg shadow-lg hover:translate-y-[-2px] transition-all">
            今すぐ始める
          </a>
        </div>
      </section>

      {/* スタイル for アニメーション */}
      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
