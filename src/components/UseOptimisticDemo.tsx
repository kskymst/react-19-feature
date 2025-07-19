import { useState, useOptimistic, startTransition } from 'react';

interface Todo {
  id: number;
  text: string;
}

export default function UseOptimisticDemo() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: '買い物に行く' },
    { id: 2, text: 'メールを確認する' },
  ]);

  type TodoAction =
    | { type: 'add'; todo: Todo }
    | { type: 'delete'; id: number };

  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
    todos,
    (state: Todo[], action: TodoAction) => {
      switch (action.type) {
        case 'add':
          // 既に同じIDのTodoが存在する場合は追加しない
          if (state.some((todo) => todo.id === action.todo.id)) {
            return state;
          }
          return [...state, action.todo];
        case 'delete':
          return state.filter((todo) => todo.id !== action.id);
        default:
          return state;
      }
    }
  );

  async function handleAddTodo(formData: FormData) {
    const text = formData.get('todo') as string;
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Math.random(),
      text: text,
    };

    // 楽観的更新
    updateOptimisticTodos({ type: 'add', todo: newTodo });

    try {
      // サーバーへの送信をシミュレート（2秒遅延）
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 「エラー」が含まれていたら失敗させる
          if (text.includes('エラー')) {
            reject(new Error('サーバーエラーが発生しました'));
          } else {
            resolve(undefined);
          }
        }, 2000);
      });

      // 成功時：実際のデータを更新
      setTodos((current) => [...current, newTodo]);
    } catch (error) {
      // 失敗時：楽観的更新は自動的にロールバックされる
      alert(`エラー: ${(error as Error).message}`);
    }
  }

  async function handleDeleteTodo(id: number) {
    startTransition(async () => {
      updateOptimisticTodos({ type: 'delete', id });

      try {
        const todoToDelete = todos.find((todo) => todo.id === id);

        // サーバーへの削除リクエストをシミュレート
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (todoToDelete?.text.includes('削除不可')) {
              reject(new Error('削除に失敗しました'));
            } else {
              resolve(undefined);
            }
          }, 1500);
        });

        // 成功時：実際のデータを更新
        setTodos((current) => current.filter((todo) => todo.id !== id));
      } catch (error) {
        // 失敗時：楽観的更新は自動的にロールバックされる
        alert(`エラー: ${(error as Error).message}`);
      }
    });
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>useOptimistic デモ</h2>
      <p>
        useOptimisticフックは、非同期操作中にUIを楽観的に更新するために使用されます。
        ユーザーアクションの結果を即座に表示し、実際の操作が完了するまで待機しません。
      </p>

      <div style={{ marginBottom: '30px' }}>
        <h3>Todoリスト</h3>
        <form action={handleAddTodo} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              name="todo"
              placeholder="新しいTodoを入力..."
              required
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              追加
            </button>
          </div>
        </form>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {optimisticTodos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                marginBottom: '8px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '4px',
              }}
            >
              <span style={{ color: '#333' }}>{todo.text}</span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                削除
              </button>
            </li>
          ))}
        </ul>

        {optimisticTodos.length === 0 && (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            Todoがありません。上のフォームから追加してください。
          </p>
        )}
      </div>

      <div style={{ fontSize: '14px', color: '#666' }}>
        <h3>主要機能:</h3>
        <ul>
          <li>
            <strong>楽観的更新:</strong>{' '}
            サーバーレスポンスを待たずにUIを即座に更新
          </li>
          <li>
            <strong>自動ロールバック:</strong>{' '}
            操作が失敗した場合、変更が自動的に元に戻る
          </li>
          <li>
            <strong>即時反映:</strong> ユーザー操作が即座にUIに反映される
          </li>
          <li>
            <strong>エラーハンドリング:</strong>{' '}
            失敗時のユーザーフレンドリーなエラー表示
          </li>
        </ul>

        <div
          style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#fff3cd',
            borderRadius: '4px',
          }}
        >
          <strong>注意:</strong>{' '}
          このデモでは意図的に特定条件で失敗を発生させています。
          <br />• 追加：「エラー」を含むTodoは失敗します
          <br />• 削除：「削除不可」を含むTodoは削除に失敗します
        </div>
      </div>
    </div>
  );
}
