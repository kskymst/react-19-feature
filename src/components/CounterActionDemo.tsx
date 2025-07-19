import React, { useActionState } from 'react';

// 状態の型定義
type CounterState = {
  count: number;
};

// カウンターのアクション関数
async function counterAction(
  prevState: CounterState,
  formData: FormData
): Promise<CounterState> {
  const action = formData.get('action') as string;
  const amount = parseInt(formData.get('amount') as string) || 1;

  // 非同期処理をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 500));

  switch (action) {
    case 'increment':
      return { count: prevState.count + amount };
    case 'decrement':
      return { count: prevState.count - amount };
    case 'reset':
      return { count: 0 };
    case 'double':
      return { count: prevState.count * 2 };
    default:
      return prevState;
  }
}

const CounterActionDemo: React.FC = () => {
  const [state, formAction, isPending] = useActionState<CounterState, FormData>(
    counterAction,
    { count: 0 }
  );

  return (
    <div
      style={{
        marginTop: '40px',
        borderTop: '2px solid #28a745',
        paddingTop: '20px',
      }}
    >
      <h2 style={{ color: '#28a745' }}>useActionState カウンターデモ</h2>
      <p>
        useActionStateを使ったカウンターの実装例です。
        ボタンクリックで異なるアクションを実行し、状態を更新します。
      </p>

      <div
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#28a745',
            marginBottom: '10px',
          }}
        >
          {state.count}
        </div>
        {isPending && (
          <div style={{ color: '#6c757d', fontStyle: 'italic' }}>更新中...</div>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        <form action={formAction}>
          <input type="hidden" name="action" value="increment" />
          <input type="hidden" name="amount" value="1" />
          <button
            type="submit"
            disabled={isPending}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: isPending ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isPending ? 'not-allowed' : 'pointer',
            }}
          >
            +1
          </button>
        </form>

        <form action={formAction}>
          <input type="hidden" name="action" value="increment" />
          <input type="hidden" name="amount" value="5" />
          <button
            type="submit"
            disabled={isPending}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: isPending ? '#ccc' : '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isPending ? 'not-allowed' : 'pointer',
            }}
          >
            +5
          </button>
        </form>

        <form action={formAction}>
          <input type="hidden" name="action" value="decrement" />
          <input type="hidden" name="amount" value="1" />
          <button
            type="submit"
            disabled={isPending}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: isPending ? '#ccc' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isPending ? 'not-allowed' : 'pointer',
            }}
          >
            -1
          </button>
        </form>

        <form action={formAction}>
          <input type="hidden" name="action" value="double" />
          <button
            type="submit"
            disabled={isPending}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: isPending ? '#ccc' : '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: isPending ? 'not-allowed' : 'pointer',
            }}
          >
            ×2
          </button>
        </form>

        <form action={formAction}>
          <input type="hidden" name="action" value="reset" />
          <button
            type="submit"
            disabled={isPending}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: isPending ? '#ccc' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isPending ? 'not-allowed' : 'pointer',
            }}
          >
            リセット
          </button>
        </form>
      </div>

      <div style={{ fontSize: '14px', color: '#666' }}>
        <strong>このデモの特徴:</strong>
        <ul>
          <li>各ボタンが独立したform要素として実装</li>
          <li>hidden inputでアクションタイプを指定</li>
          <li>非同期処理（0.5秒の遅延）でローディング状態を確認可能</li>
          <li>一つのアクション関数で複数の操作を管理</li>
        </ul>
      </div>
    </div>
  );
};

export default CounterActionDemo;
