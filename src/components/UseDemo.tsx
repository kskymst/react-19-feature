import { use, useState, Suspense, createContext, Component } from 'react';

export default function UseDemo() {
  const [userId, setUserId] = useState(1);
  const [userPromise, setUserPromise] = useState(() => fetchUserData(1));
  const [userContext] = useState(() => createUserContext(1));

  const handleFetchUser = () => {
    const newPromise = fetchUserData(userId);
    setUserPromise(newPromise);
  };

  const handleFetchError = () => {
    const errorPromise = fetchUserData(999);
    setUserPromise(errorPromise);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>use フックデモ</h2>
      <p>
        useフックは、React
        19で導入された新しいフックで、PromiseやContextを直接読み取ることができます。
        従来のuseEffectやuseContextと組み合わせて使用する必要がありません。
      </p>

      <div style={{ marginBottom: '30px' }}>
        <h3>1. Promise を使った非同期データの読み取り</h3>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="userId" style={{ marginRight: '10px' }}>
            ユーザーID:
          </label>
          <input
            type="number"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            min="1"
            max="10"
            style={{
              padding: '5px',
              marginRight: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <button
            onClick={handleFetchUser}
            style={{
              padding: '5px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            ユーザー情報を取得
          </button>
          <button
            onClick={handleFetchError}
            style={{
              padding: '5px 15px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            エラーをテスト
          </button>
        </div>

        <ErrorBoundary>
          <Suspense
            fallback={
              <div
                style={{ padding: '15px', fontStyle: 'italic', color: '#666' }}
              >
                読み込み中...
              </div>
            }
          >
            <UserProfile userPromise={userPromise} />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>2. Context を使った値の読み取り</h3>
        <userContext.Provider
          value={{ userId: 42, theme: 'dark', language: 'en' }}
        >
          <ContextDemo context={userContext} />
        </userContext.Provider>
      </div>

      <div style={{ fontSize: '14px', color: '#666' }}>
        <h3>主要機能:</h3>
        <ul>
          <li>
            <strong>Promise サポート:</strong>{' '}
            Promiseを直接読み取り、Suspenseと組み合わせて使用
          </li>
          <li>
            <strong>Context サポート:</strong> useContextの代替として Context
            を直接読み取り
          </li>
          <li>
            <strong>エラーハンドリング:</strong> Promise の reject
            はエラーバウンダリでキャッチ
          </li>
          <li>
            <strong>簡潔な記述:</strong> 従来のフックよりもシンプルなコード
          </li>
        </ul>

        <div
          style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#d1ecf1',
            borderRadius: '4px',
          }}
        >
          <strong>注意:</strong>{' '}
          useフックはコンポーネントやカスタムフックの中でのみ使用できます。
          PromiseやContextの値が変更された場合、コンポーネントは自動的に再レンダリングされます。
        </div>
      </div>
    </div>
  );
}

// Promise を作成する関数
function fetchUserData(
  userId: number
): Promise<{ id: number; name: string; email: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 999) {
        reject(new Error('ユーザーが見つかりません'));
      } else {
        resolve({
          id: userId,
          name: `ユーザー${userId}`,
          email: `user${userId}@example.com`,
        });
      }
    }, 1500);
  });
}

// Context を作成する関数
function createUserContext(userId: number) {
  return createContext({
    userId,
    theme: 'light',
    language: 'ja',
  });
}

// Promise を使用するコンポーネント
function UserProfile({ userPromise }: { userPromise: Promise<any> }) {
  const user = use(userPromise);

  return (
    <div
      style={{
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        marginTop: '10px',
      }}
    >
      <h4>ユーザー情報</h4>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>名前:</strong> {user.name}
      </p>
      <p>
        <strong>メール:</strong> {user.email}
      </p>
    </div>
  );
}

// Context を使用するコンポーネント
function ContextDemo({ context }: { context: React.Context<any> }) {
  const contextValue = use(context);

  return (
    <div
      style={{
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#e8f4fd',
        marginTop: '10px',
      }}
    >
      <h4>コンテキスト情報</h4>
      <p>
        <strong>ユーザーID:</strong> {contextValue.userId}
      </p>
      <p>
        <strong>テーマ:</strong> {contextValue.theme}
      </p>
      <p>
        <strong>言語:</strong> {contextValue.language}
      </p>
    </div>
  );
}

// エラーバウンダリコンポーネント
class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '15px',
            border: '1px solid #dc3545',
            borderRadius: '8px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            marginTop: '10px',
          }}
        >
          <h4>エラーが発生しました</h4>
          <p>{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '5px 10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            リセット
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
