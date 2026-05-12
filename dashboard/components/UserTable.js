import UserRow from './UserRow';

export default function UserTable({
  users,
  onEdit,
  onDelete
}) {

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Joined</th>
            <th>Source</th>
            <th>Role</th>
            <th>Verified</th>
            <th> Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}