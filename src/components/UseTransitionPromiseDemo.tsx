import React, { useState, useTransition } from 'react';

// APIコールをシミュレートするPromise関数
const fetchUserData = (
  userId: number
): Promise<{ id: number; name: string; email: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        if (userId === 999) {
          reject(new Error('ユーザーが見つかりません'));
        } else {
          resolve({
            id: userId,
            name: `ユーザー ${userId}`,
            email: `user${userId}@example.com`,
          });
        }
      },
      1000 + Math.random() * 2000
    ); // 1-3秒のランダムな遅延
  });
};

interface UserData {
  id: number;
  name: string;
  email: string;
}

const UseTransitionPromiseDemo: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFetchUser = () => {
    const id = parseInt(userId);
    if (isNaN(id) || id <= 0) {
      setError('有効なユーザーIDを入力してください');
      return;
    }

    setError(null);
    setUserData(null);

    // useTransitionでPromiseベースの非同期処理を実行
    startTransition(async () => {
      try {
        const data = await fetchUserData(id);
        setUserData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '不明なエラーが発生しました'
        );
      }
    });
  };

  return (
    <div
      style={{
        marginTop: '40px',
        borderTop: '2px solid #007bff',
        paddingTop: '20px',
      }}
    >
      <h2 style={{ color: '#007bff' }}>useTransition + Promise パターン</h2>
      <p>
        v19からstartTransitionが非同期処理をサポート
        useTransitionとPromiseを組み合わせて、非同期API呼び出しを実行します。
        UIは常にレスポンシブで、ローディング状態も適切に管理されます。
      </p>

      <div style={{ marginBottom: '20px' }}>
        <label>
          ユーザーID:
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{
              marginLeft: '10px',
              padding: '5px',
              border: '1px solid #007bff',
              borderRadius: '4px',
              marginRight: '10px',
            }}
            placeholder="1-998 (999はエラー)"
          />
        </label>
        <button
          onClick={handleFetchUser}
          disabled={isPending}
          style={{
            padding: '5px 15px',
            backgroundColor: isPending ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isPending ? 'not-allowed' : 'pointer',
          }}
        >
          {isPending ? '取得中...' : 'ユーザー取得'}
        </button>
      </div>

      {isPending && (
        <div
          style={{
            color: '#007bff',
            fontStyle: 'italic',
            marginBottom: '20px',
          }}
        >
          ユーザーデータを取得中... (バックグラウンドで実行中)
        </div>
      )}

      {error && (
        <div
          style={{
            color: '#d9534f',
            backgroundColor: '#fdf2f2',
            padding: '10px',
            border: '1px solid #d9534f',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          エラー: {error}
        </div>
      )}

      {userData && (
        <div
          style={{
            backgroundColor: '#d4edda',
            padding: '15px',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', color: '#155724' }}>
            ユーザー情報
          </h3>
          <p>
            <strong>ID:</strong> {userData.id}
          </p>
          <p>
            <strong>名前:</strong> {userData.name}
          </p>
          <p>
            <strong>メール:</strong> {userData.email}
          </p>
        </div>
      )}

      <div style={{ fontSize: '14px', color: '#666' }}>
        <strong>Promiseパターンの特徴:</strong>
        <ul>
          <li>async/awaitを使った非同期処理が可能</li>
          <li>エラーハンドリングがtry-catchで簡潔に書ける</li>
          <li>APIコールやデータフェッチに最適</li>
          <li>isPendingでローディング状態を管理</li>
        </ul>
        <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
          試してみる: 1-998の数字を入力（999はエラーテスト用）
        </p>
      </div>
    </div>
  );
};

export default UseTransitionPromiseDemo;
