'use client'; // Reactの動的な機能（State）を使うための宣言

import { useState } from 'react';

// 1つのブロック（パーツ）の型定義
interface PortfolioBlock {
  id: string;
  type: 'text' | 'code' | '3d-model';
  content: string;
}

export default function Home() {
  // ユーザーのポートフォリオデータを管理するState（メモリ上のデータベースのようなもの）
  const [blocks, setBlocks] = useState<PortfolioBlock[]>([
    { id: '1', type: 'text', content: 'こんにちは！エンジニアの夢來です。' },
    { id: '2', type: 'code', content: 'print("Hello World")' },
  ]);

  // 新しいブロックを追加する関数
  const addBlock = (type: 'text' | 'code' | '3d-model') => {
    const newBlock: PortfolioBlock = {
      id: Date.now().toString(), // 被らない一時的なID
      type: type,
      content: type === 'code' ? '// ここにコードを書く' : '新しいテキスト',
    };
    setBlocks([...blocks, newBlock]); // 既存の配列に新しいブロックをガッチャンコする
  };

  // ブロックの内容が書き換わったときにデータを更新する関数
  const updateBlockContent = (id: string, text: string) => {
    const updated = blocks.map((block) => {
      if (block.id === id) {
        return { ...block, content: text };
      }
      return block;
    });
    setBlocks(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex gap-8">
      
      {/* 左半分：エディタ画面（作る側） */}
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">🛠️ ポートフォリオ エディタ</h2>
        
        {/* ブロック追加ボタン群 */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => addBlock('text')} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">＋ テキスト追加</button>
          <button onClick={() => addBlock('code')} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm">＋ コード追加</button>
        </div>

        {/* ブロックの入力フォーム一覧 */}
        <div className="space-y-4">
          {blocks.map((block) => (
            <div key={block.id} className="border p-4 rounded bg-gray-50">
              <span className="text-xs font-bold uppercase text-gray-500">{block.type} ブロック</span>
              <textarea
                className="w-full mt-2 p-2 border rounded font-mono text-sm text-gray-800"
                rows={3}
                value={block.content}
                onChange={(e) => updateBlockContent(block.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 右半分：公開画面プレビュー（人が見る側） */}
      <div className="w-1/2 bg-gray-900 text-white p-6 rounded-lg shadow-md min-h-[500px]">
        <h2 className="text-xl font-bold mb-4 text-gray-400 border-b border-gray-700 pb-2">🌐 公開ページ（プレビュー）</h2>
        
        <div className="space-y-6">
          {blocks.map((block) => {
            if (block.type === 'text') {
              return <p key={block.id} className="text-lg text-gray-200">{block.content}</p>;
            }
            if (block.type === 'code') {
              return (
                <pre key={block.id} className="bg-black p-4 rounded font-mono text-sm text-green-400 overflow-x-auto border border-gray-800">
                  <code>{block.content}</code>
                </pre>
              );
            }
            return null;
          })}
        </div>
      </div>

    </div>
  );
}