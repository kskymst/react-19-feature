import { useState, useTransition } from 'react';

type Task = {
  id: number;
  title: string;
  assignee: string;
};

const tabs = {
  a: 'A',
  b: 'B',
  c: 'C',
};

const tasks = generateTasks();

const filteringTab = (tab: string) => {
  return tasks.filter((task) => task.assignee === tab);
};

const WithUseTransitionDemo = () => {
  const [activeTab, setActiveTab] = useState(tabs.a);
  const [taskList, setTaskList] = useState(tasks);
  const [isPending, startTransition] = useTransition();

  const onClickTab = (tab: string) => {
    setActiveTab(tab);
    startTransition(() => {
      setTaskList(filteringTab(tab));
    });
  };

  return (
    <div>
      <h2>useTransitionを使ったタブ切り替えデモ</h2>
      <p>
        タブをクリックすると重いフィルタリング処理が実行されます。
        useTransitionにより、タブ切り替えがスムーズに行われ、UIがブロックされません。
      </p>

      {/* タブヘッダー */}
      <div
        style={{
          display: 'flex',
          borderBottom: '2px solid #ddd',
          marginBottom: '20px',
        }}
      >
        {Object.entries(tabs).map(([key, value]) => (
          <Tab
            key={key}
            tab={value}
            onClick={onClickTab}
            activeTab={activeTab}
          />
        ))}
      </div>

      {/* タブコンテンツ */}
      <div
        style={{
          minHeight: '300px',
          maxHeight: '400px',
          overflowY: 'auto',
          border: '1px solid #ddd',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '4px',
        }}
      >
        {isPending ? (
          <div
            style={{
              color: '#888',
              textAlign: 'center',
              padding: '40px',
              fontSize: '16px',
            }}
          >
            Loading...
          </div>
        ) : (
          taskList.map((task) => (
            <div
              key={task.id}
              style={{
                padding: '8px 0',
                borderBottom: '1px solid #eee',
                fontSize: '14px',
              }}
            >
              <p style={{ fontWeight: 'bold' }}>タイトル: {task.title}</p>
              <p style={{ color: '#666' }}>担当者: {task.assignee}</p>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <strong>useTransitionの効果:</strong>
        <ul>
          <li>タブの切り替えが常にスムーズ</li>
          <li>重いフィルタリング処理中でもUIがブロックされない</li>
          <li>isPendingでローディング状態を表示可能</li>
          <li>ユーザーは他のタブをすぐにクリック可能</li>
        </ul>
      </div>
    </div>
  );
};

function generateTasks(): Task[] {
  return Array(10000)
    .fill('')
    .map((_, i) => {
      const addedIndex = i + 1;
      return {
        id: addedIndex,
        title: `Task ${addedIndex}`,
        assignee:
          addedIndex % 3 === 0
            ? tabs.a
            : addedIndex % 2 === 0
              ? tabs.b
              : tabs.c,
      };
    });
}

const Tab = ({
  tab,
  onClick,
  activeTab,
}: {
  tab: string;
  onClick: (tab: string) => void;
  activeTab: string;
}) => {
  return (
    <button
      onClick={() => onClick(tab)}
      style={{
        padding: '12px 24px',
        border: 'none',
        borderBottom:
          activeTab === tab ? '3px solid #007bff' : '3px solid transparent',
        backgroundColor: activeTab === tab ? '#e7f3ff' : 'transparent',
        color: activeTab === tab ? '#007bff' : '#666',
        fontWeight: activeTab === tab ? 'bold' : 'normal',
        cursor: 'pointer',
      }}
    >
      担当者 {tab}
    </button>
  );
};

export default WithUseTransitionDemo;
