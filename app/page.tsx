'use client'; // Reactの動的な機能（State）を使うための宣言

import { useState } from 'react';
//右側のプレビュー画面を担当するコンポーネント
import PortfolioView from './components/PortfolioView';
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
        
        <button onClick={() => {
          localStorage.setItem('portfolio_data', JSON.stringify(blocks));
          alert('ブラウザにデータを保存しました！');
          }} className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm font-bold">
          データを保存
        </button>

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

      {/* 右側：引っ越し先のパーツを呼び出して、現在のデータを渡すだけ！ */}
      <PortfolioView blocks={blocks} />

    </div>
  );
}