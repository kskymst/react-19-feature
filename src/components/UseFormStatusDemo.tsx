import { useFormStatus } from 'react-dom';

export default function UseFormStatusDemo() {
  async function handleSubmit(formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    console.log('Form submitted:', { name, email });
    alert(`フォームが正常に送信されました！\n名前: ${name}\nメール: ${email}`);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>useFormStatus デモ</h2>
      <p>
        useFormStatusフックは最後のフォーム送信のステータス情報を提供します。
        フォーム内でレンダリングされるコンポーネント内でのみ使用できます。
      </p>

      <form
        action={handleSubmit}
        style={{
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '8px',
          maxWidth: '400px',
        }}
      >
        <FormContent />

        <div style={{ marginBottom: '15px' }}>
          <label
            htmlFor="name"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            名前:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="email"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            メールアドレス:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <SubmitButton />
      </form>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <h3>主要機能:</h3>
        <ul>
          <li>
            <strong>pending:</strong> フォームが現在送信中かどうかを示します
          </li>
          <li>
            <strong>data:</strong>{' '}
            送信されたフォームデータを含むFormDataオブジェクト
          </li>
          <li>
            <strong>method:</strong> 送信に使用されるHTTPメソッド
          </li>
          <li>
            <strong>action:</strong> 実行されるアクション関数
          </li>
        </ul>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? '送信中...' : '送信'}
    </button>
  );
}

function FormContent() {
  const { pending, data, method, action } = useFormStatus();

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>フォームステータス:</h3>
      <ul>
        <li>送信中: {pending ? 'はい' : 'いいえ'}</li>
        <li>メソッド: {method || 'なし'}</li>
        <li>
          データ:{' '}
          {data ? JSON.stringify(Object.fromEntries(data.entries())) : 'なし'}
        </li>
        <li>アクション: {action ? '関数が提供されています' : 'なし'}</li>
      </ul>
    </div>
  );
}
