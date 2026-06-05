'use client';

import { useEffect, useState } from 'react';
import PortfolioView from '../components/PortfolioView';

interface PortfolioBlock {
  id: string;
  type: 'text' | 'code' | '3d-model';
  content: string;
}

export default function SharePage() {
  const [blocks, setBlocks] = useState<PortfolioBlock[]>([]);

  useEffect(() => {
    // 画面が開いた瞬間に、ブラウザの記憶からデータを取り出す
    const savedData = localStorage.getItem('portfolio_data');
    if (savedData) {
      setBlocks(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 取り出したリアルタイムなデータを渡して表示 */}
      <PortfolioView blocks={blocks} />
    </div>
  );
}