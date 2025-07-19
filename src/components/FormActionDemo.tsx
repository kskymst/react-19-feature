import React, { useActionState } from 'react';

// 状態の型定義
type FormState = {
  success: boolean;
  error: string | null;
  data: {
    name: string;
    email: string;
    message: string;
    submittedAt: string;
  } | null;
};

// フォーム送信をシミュレートするアクション関数
async function submitForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // バリデーション
  if (!name || !email || !message) {
    return {
      success: false,
      error: '全ての項目を入力してください',
      data: null
    };
  }

  if (!email.includes('@')) {
    return {
      success: false,
      error: '有効なメールアドレスを入力してください',
      data: null
    };
  }

  // 送信をシミュレート（2秒待機）
  await new Promise(resolve => setTimeout(resolve, 2000));

  // ランダムに成功/失敗を決定
  const isSuccess = Math.random() > 0.3;

  if (isSuccess) {
    return {
      success: true,
      error: null,
      data: { name, email, message, submittedAt: new Date().toLocaleString() }
    };
  } else {
    return {
      success: false,
      error: 'サーバーエラーが発生しました。しばらく後に再試行してください。',
      data: null
    };
  }
}

const FormActionDemo: React.FC = () => {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(submitForm, {
    success: false,
    error: null,
    data: null
  });

  return (
    <div>
      <h2>useActionState + Form Action デモ</h2>
      <p>
        useActionStateとform actionを組み合わせて、フォーム送信を管理します。
        バリデーション、ローディング状態、エラーハンドリングが簡潔に実装できます。
      </p>

      <form action={formAction} style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
            名前:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            disabled={isPending}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              opacity: isPending ? 0.6 : 1
            }}
            placeholder="山田太郎"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            メールアドレス:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            disabled={isPending}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              opacity: isPending ? 0.6 : 1
            }}
            placeholder="example@email.com"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>
            メッセージ:
          </label>
          <textarea
            id="message"
            name="message"
            disabled={isPending}
            rows={4}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              resize: 'vertical',
              opacity: isPending ? 0.6 : 1
            }}
            placeholder="お問い合わせ内容を入力してください"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: '10px 20px',
            backgroundColor: isPending ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {isPending ? '送信中...' : '送信'}
        </button>
      </form>

      {/* ローディング状態 */}
      {isPending && (
        <div style={{ 
          marginTop: '20px',
          color: '#007bff',
          fontStyle: 'italic'
        }}>
          フォームを送信中です...
        </div>
      )}

      {/* エラー表示 */}
      {state.error && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#fdf2f2',
          border: '1px solid #d9534f',
          borderRadius: '4px',
          color: '#d9534f'
        }}>
          エラー: {state.error}
        </div>
      )}

      {/* 成功時の表示 */}
      {state.success && state.data && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          color: '#155724'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>送信完了</h3>
          <p><strong>名前:</strong> {state.data.name}</p>
          <p><strong>メール:</strong> {state.data.email}</p>
          <p><strong>メッセージ:</strong> {state.data.message}</p>
          <p><strong>送信日時:</strong> {state.data.submittedAt}</p>
        </div>
      )}

      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <strong>useActionStateの特徴:</strong>
        <ul>
          <li>フォームアクションと状態管理が統合されている</li>
          <li>isPendingで自動的にローディング状態を管理</li>
          <li>バリデーションとエラーハンドリングが簡潔</li>
          <li>TypeScriptとの相性が良い</li>
        </ul>
        <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
          ※ 送信は70%の確率で成功します（デモ用）
        </p>
      </div>
    </div>
  );
};

export default FormActionDemo;