import React, { useState, useTransition } from 'react';

// 重い処理をシミュレートする関数
const generateItems = (count: number) => {
  console.log('generateItems', count);
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(`アイテム ${i + 1}`);
  }
  return items;
};

const WithUseTransitionDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    startTransition(() => {
      const count = parseInt(value) || 0;
      setItems(generateItems(count));
    });
  };

  console.log('render');

  return (
    <div>
      <h2>useTransitionのデモ</h2>
      <p>
        数字を入力すると、その数だけアイテムが生成されます。
        useTransitionにより、入力が重い処理によってブロックされることがありません。
      </p>

      <div style={{ marginBottom: '20px' }}>
        <label>
          アイテム数を入力:
          <input
            type="number"
            value={input}
            onChange={handleInputChange}
            style={{
              marginLeft: '10px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
            placeholder="例: 1000"
          />
        </label>
      </div>

      {isPending && (
        <div style={{ color: '#666', fontStyle: 'italic' }}>
          処理中... (バックグラウンドで実行中)
        </div>
      )}

      <div
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          border: '1px solid #ddd',
          padding: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} style={{ padding: '2px 0' }}>
              {item}
            </div>
          ))
        ) : (
          <div style={{ color: '#888' }}>
            上の入力欄に数字を入力してください
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <strong>useTransitionの効果:</strong>
        <ul>
          <li>入力フィールドは常にレスポンシブ</li>
          <li>重い処理中でもUIがブロックされない</li>
          <li>isPendingでローディング状態を表示可能</li>
        </ul>
      </div>
    </div>
  );
};

export default WithUseTransitionDemo;
