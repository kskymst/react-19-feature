import React, { useState } from 'react';

// 重い処理をシミュレートする関数
const generateItems = (count: number) => {
  console.log('generateItems', count);
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(`アイテム ${i + 1}`);
  }
  return items;
};

const WithoutUseTransitionDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    const count = parseInt(value) || 0;
    setItems(generateItems(count));
  };

  console.log('render');

  return (
    <div
      style={{
        marginTop: '40px',
        borderTop: '2px solid #ddd',
        paddingTop: '20px',
      }}
    >
      <h2 style={{ color: '#d9534f' }}>比較: useTransitionを使わない場合</h2>
      <p style={{ color: '#d9534f' }}>
        同じ処理をuseTransitionを使わずに実行します。
        大きな数値を入力すると、入力フィールドがブロックされることを確認できます。
      </p>

      <div style={{ marginBottom: '20px' }}>
        <label>
          アイテム数を入力（useTransition無し）:
          <input
            type="number"
            value={input}
            onChange={handleInputChange}
            style={{
              marginLeft: '10px',
              padding: '5px',
              border: '1px solid #d9534f',
              borderRadius: '4px',
            }}
            placeholder="例: 1000"
          />
        </label>
      </div>

      <div
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
          border: '1px solid #d9534f',
          padding: '10px',
          backgroundColor: '#fdf2f2',
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

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#d9534f' }}>
        <strong>useTransitionを使わない場合の問題:</strong>
        <ul>
          <li>大きな数値を入力すると入力フィールドがブロックされる</li>
          <li>連続して入力した場合、UIが応答しなくなる</li>
          <li>ユーザーエクスペリエンスが悪化する</li>
        </ul>
      </div>
    </div>
  );
};

export default WithoutUseTransitionDemo;
