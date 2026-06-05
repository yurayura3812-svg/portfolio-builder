// app/components/PortfolioView.tsx
'use client';

// page.tsx から「右側の黒いプレビュー画面」に必要なデータ（型）の定義
interface Block {
  id: string;
  type: 'text' | 'code' | '3d-model';
  content: string;
}

interface PortfolioViewProps {
  blocks: Block[]; // エディタから渡される、入力されたデータの配列
}

export default function PortfolioView({ blocks }: PortfolioViewProps) {
  return (
    <div className="w-1/2 bg-gray-900 text-white p-6 min-h-screen">
      <h2 className="text-xl font-bold mb-4">✨ プレビュー画面（書き出し対象）</h2>
      <div className="space-y-4">
        {blocks.map((block) => (
          <div key={block.id} className="p-4 rounded border border-gray-700 bg-gray-800">
            {block.type === 'text' ? (
              <p className="whitespace-pre-wrap">{block.content || 'テキストが未入力です'}</p>
            ) : block.type === 'code' ? (
              <pre className="font-mono text-sm overflow-x-auto bg-black p-3 rounded text-green-400">
                <code>{block.content || '// コードが未入力です'}</code>
              </pre>
            ) : (
              <div className="italic text-gray-300">3Dモデルプレビュー（未実装）</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}