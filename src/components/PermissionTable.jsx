function PermissionTable({ rolePermissions }) {
  return (
    <div className="permission-table">
      <h3>Permission Management</h3>

      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Create</th>
            <th>Delete</th>
            <th>Update</th>
            <th>Complete</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(rolePermissions).map(([role, permissions]) => (
            <tr key={role}>
              <td>{role}</td>
              <td>{permissions.canCreate ? "Yes" : "No"}</td>
              <td>{permissions.canDelete ? "Yes" : "No"}</td>
              <td>{permissions.canUpdate ? "Yes" : "No"}</td>
              <td>{permissions.canComplete ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PermissionTable;