import { useState } from 'react';

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

const WithoutUseTransitionDemo = () => {
  const [activeTab, setActiveTab] = useState(tabs.a);
  const [taskList, setTaskList] = useState(tasks);

  const onClickTab = (tab: string) => {
    setActiveTab(tab);
    // useTransitionを使わずに同期的に重い処理を実行
    const filteredTasks = filteringTab(tab);
    setTaskList(filteredTasks);
  };

  return (
    <div>
      <h2 style={{ color: '#d9534f' }}>
        useTransitionを使わないタブ切り替えデモ
      </h2>
      <p style={{ color: '#d9534f' }}>
        タブをクリックすると重いフィルタリング処理が実行されます。
        useTransitionを使わないため、コンテンツ処理中はUIがブロックされます。
      </p>

      {/* タブヘッダー */}
      <div
        style={{
          display: 'flex',
          borderBottom: '2px solid #d9534f',
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
          border: '1px solid #d9534f',
          padding: '20px',
          backgroundColor: '#fdf2f2',
          borderRadius: '4px',
        }}
      >
        {taskList.length > 0 ? (
          <div>
            <h3 style={{ marginTop: 0, color: '#d9534f' }}>
              担当者 {activeTab} のタスク ({taskList.length}件)
            </h3>
            {taskList.map((task) => (
              <div
                key={task.id}
                style={{
                  padding: '8px 0',
                  borderBottom: '1px solid #eee',
                  fontSize: '14px',
                }}
              >
                <div style={{ fontWeight: 'bold' }}>タイトル: {task.title}</div>
                <div style={{ color: '#666' }}>担当者: {task.assignee}</div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              color: '#888',
              textAlign: 'center',
              padding: '40px',
              fontSize: '16px',
            }}
          >
            タスクがありません
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#d9534f' }}>
        <strong>useTransitionを使わない場合の問題:</strong>
        <ul>
          <li>フィルタリング処理中はUI全体がフリーズする</li>
          <li>他のタブをクリックできない</li>
          <li>ユーザーは処理が終わるまで待つ必要がある</li>
          <li>ユーザーエクスペリエンスが悪化する</li>
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
          activeTab === tab ? '3px solid #d9534f' : '3px solid transparent',
        backgroundColor: activeTab === tab ? '#fdf2f2' : 'transparent',
        color: activeTab === tab ? '#d9534f' : '#666',
        fontWeight: activeTab === tab ? 'bold' : 'normal',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      担当者 {tab}
    </button>
  );
};

export default WithoutUseTransitionDemo;
