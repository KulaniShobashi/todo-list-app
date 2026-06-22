function TopicCard({
  topic,
  subTopicInputs,
  canCreate,
  canDelete,
  canUpdate,
  canComplete,
  toggleSelectTopic,
  deleteTopic,
  handleSubTopicChange,
  addSubTopic,
  toggleSubTopic,
  deleteSubTopic,
  updateSubTopicDescription,
}) {
  return (
    <div className={`topic-card ${topic.deleted ? "deleted" : ""}`}>
      <div className="topic-header">
        <div className="topic-title-row">
          {canDelete && !topic.deleted && (
            <input
              type="checkbox"
              checked={topic.selected || false}
              onChange={() => toggleSelectTopic(topic.id)}
            />
          )}

          <div>
            <h2>{topic.title}</h2>

            {topic.deleted && (
              <p className="deleted-marker">
                Deleted by {topic.deletedBy} on {topic.deletedAt}
              </p>
            )}
          </div>
        </div>

        {canDelete && !topic.deleted && (
          <button className="delete-btn" onClick={() => deleteTopic(topic.id)}>
            Delete
          </button>
        )}
      </div>

      {canCreate && !topic.deleted && (
        <div className="subtopic-input-row">
          <input
            type="text"
            placeholder="Enter subtopic..."
            value={subTopicInputs[topic.id] || ""}
            onChange={(e) => handleSubTopicChange(topic.id, e.target.value)}
          />

          <button onClick={() => addSubTopic(topic.id)}>Add</button>
        </div>
      )}

      <ul className="subtopic-list">
        {topic.subTopics.map((subTopic) => (
          <li
            key={subTopic.id}
            className={`subtopic-item ${subTopic.deleted ? "deleted" : ""}`}
          >
            <div className="subtopic-header">
              <label className="subtopic-title">
                {canComplete && !topic.deleted && !subTopic.deleted && (
                  <input
                    type="checkbox"
                    checked={subTopic.completed || false}
                    onChange={() => toggleSubTopic(topic.id, subTopic.id)}
                  />
                )}

                <div>
                  <span className={subTopic.completed ? "completed" : ""}>
                    {subTopic.title}
                  </span>

                  {subTopic.deleted && (
                    <p className="deleted-marker">
                      Deleted by {subTopic.deletedBy} on {subTopic.deletedAt}
                    </p>
                  )}
                </div>
              </label>

              {canDelete && !subTopic.deleted && (
                <button
                  className="subtopic-delete-btn"
                  onClick={() => deleteSubTopic(topic.id, subTopic.id)}
                >
                  ×
                </button>
              )}
            </div>

            {canUpdate && !topic.deleted && !subTopic.deleted && (
              <textarea
                placeholder="Add description..."
                value={subTopic.description || ""}
                onChange={(e) =>
                  updateSubTopicDescription(
                    topic.id,
                    subTopic.id,
                    e.target.value
                  )
                }
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicCard;