import { useEffect, useState } from "react";
import UserPanel from "./UserPanel";
import PermissionTable from "./PermissionTable";
import TopicCard from "./TopicCard";

const rolePermissions = {
  Admin: {
    canCreate: true,
    canDelete: true,
    canUpdate: true,
    canComplete: true,
  },
  "Dept-head": {
    canCreate: false,
    canDelete: true,
    canUpdate: false,
    canComplete: false,
  },
  Learner: {
    canCreate: true,
    canDelete: false,
    canUpdate: true,
    canComplete: true,
  },
  Viewer: {
    canCreate: false,
    canDelete: false,
    canUpdate: false,
    canComplete: false,
  },
};

function TodoApp() {
  const [topics, setTopics] = useState(() => {
    const savedTopics = localStorage.getItem("topics");
    return savedTopics ? JSON.parse(savedTopics) : [];
  });

  const [currentUser, setCurrentUser] = useState({
    name: "Josh",
    role: "Admin",
  });

  const [newTopic, setNewTopic] = useState("");
  const [subTopicInputs, setSubTopicInputs] = useState({});

  const currentPermissions = rolePermissions[currentUser.role];

  const canCreate = currentPermissions.canCreate;
  const canDelete = currentPermissions.canDelete;
  const canUpdate = currentPermissions.canUpdate;
  const canComplete = currentPermissions.canComplete;

  useEffect(() => {
    localStorage.setItem("topics", JSON.stringify(topics));
  }, [topics]);

  function addTopic() {
    if (!canCreate || newTopic.trim() === "") return;

    const topic = {
      id: Date.now(),
      title: newTopic,
      subTopics: [],
      selected: false,
     
    };

    setTopics([...topics, topic]);
    setNewTopic("");
  }

  function deleteTopic(topicId) {
    if (!canDelete) return;

    const updatedTopics = topics.filter((topic)=> topic.id !== topicId);
    setTopics(updatedTopics);
  }

  function toggleSelectTopic(topicId) {
    if (!canDelete) return;

    setTopics(
      topics.map((topic) =>
        topic.id === topicId && !topic.deleted
          ? { ...topic, selected: !topic.selected }
          : topic
      )
    );
  }

  function deleteSelectedTopics() {
    if (!canDelete) return;

    const updatedTopics = topics.filter((topics)=> !topic.selected);
    setTopics(updatedTopics);
  }

  function handleSubTopicChange(topicId, value) {
    setSubTopicInputs({
      ...subTopicInputs,
      [topicId]: value,
    });
  }

  function addSubTopic(topicId) {
    if (!canCreate) return;

    const subTopicText = subTopicInputs[topicId];
    if (!subTopicText || subTopicText.trim() === "") return;

    setTopics(
      topics.map((topic) =>
        topic.id === topicId && !topic.deleted
          ? {
              ...topic,
              subTopics: [
                ...topic.subTopics,
                {
                  id: Date.now(),
                  title: subTopicText,
                  description: "",
                  completed: false,
                 
                },
              ],
            }
          : topic
      )
    );

    setSubTopicInputs({ ...subTopicInputs, [topicId]: "" });
  }

  function deleteSubTopic(topicId, subTopicId) {
    if (!canDelete) return;

    const updatedTopics = topics.map((topic)=>
      topic.id === topicId
      ? {
        ...topic,
        subTopics: topic.subTopics.filter(
            (subTopics)=> subTopic.id !== subTopicId
        ),
      }
      :topic
    );
    setTopics(updatedTopics);
  }

  function toggleSubTopic(topicId, subTopicId) {
    if (!canComplete) return;

    setTopics(
      topics.map((topic) =>
        topic.id === topicId && !topic.deleted
          ? {
              ...topic,
              subTopics: topic.subTopics.map((subTopic) =>
                subTopic.id === subTopicId && !subTopic.deleted
                  ? { ...subTopic, completed: !subTopic.completed }
                  : subTopic
              ),
            }
          : topic
      )
    );
  }

  function updateSubTopicDescription(topicId, subTopicId, description) {
    if (!canUpdate) return;

    setTopics(
      topics.map((topic) =>
        topic.id === topicId && !topic.deleted
          ? {
              ...topic,
              subTopics: topic.subTopics.map((subTopic) =>
                subTopic.id === subTopicId && !subTopic.deleted
                  ? { ...subTopic, description }
                  : subTopic
              ),
            }
          : topic
      )
    );
  }

  return (
    <div className="app-wrapper">
      <div className="todo-card">
        <h1>My Topics</h1>
        <p>Plan your learning step by step</p>

        <UserPanel currentUser={currentUser} setCurrentUser={setCurrentUser} />

        <PermissionTable rolePermissions={rolePermissions} />

        {canCreate && (
          <div className="topic-input-row">
            <input
              type="text"
              placeholder="Enter a topic..."
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
            />

            <button onClick={addTopic}>Add Topic</button>
          </div>
        )}

        {canDelete &&
          topics.some((topic) => topic.selected && !topic.deleted) && (
            <button
              className="delete-selected-btn"
              onClick={deleteSelectedTopics}
            >
              Delete Selected Topics
            </button>
          )}

        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            subTopicInputs={subTopicInputs}
            canCreate={canCreate}
            canDelete={canDelete}
            canUpdate={canUpdate}
            canComplete={canComplete}
            toggleSelectTopic={toggleSelectTopic}
            deleteTopic={deleteTopic}
            handleSubTopicChange={handleSubTopicChange}
            addSubTopic={addSubTopic}
            toggleSubTopic={toggleSubTopic}
            deleteSubTopic={deleteSubTopic}
            updateSubTopicDescription={updateSubTopicDescription}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoApp;