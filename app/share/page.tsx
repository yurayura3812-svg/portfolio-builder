// app/share/page.tsx
'use client';

import PortfolioView from '../components/PortfolioView';

export default function SharePage() {
  // 【実験用の仮データ】本来はエディタで保存したデータがここに入ります
  const mockPublishData = [
    { id: '1', type: 'text' as const, content: 'これは実際に公開されたページです！' },
    { id: '2', type: 'code' as const, content: 'console.log("HTML自動生成テスト成功");' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 画面幅いっぱいに、純粋なポートフォリオだけを表示する */}
      <PortfolioView blocks={mockPublishData} />
    </div>
  );
}