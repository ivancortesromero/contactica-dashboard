import ActionButton from './ActionButton';

export default function UserRow({
  user,
  onEdit,
  onDelete
}) {

  const isWordPressUser =
    user.source === 'WordPress';

  return (
    <tr>
      <td className="user-info">
        <div>{user.full_name}</div>
        <span>{user.email}</span>
      </td>

      <td className="last-activity">
        {user.joined}
      </td>

      <td className="last-activity">
        {user.source || '—'}
      </td>

      <td>
        <span className="badge">
          {user.role}
        </span>
      </td>

      <td>
        {user.verified ? 'Yes' : 'No'}
      </td>

      <td className="actions-cell">
        <ActionButton
          disabled={isWordPressUser}
          onClick={() => onEdit(user)}
        >
          ✏️
        </ActionButton>

        <ActionButton
          disabled={isWordPressUser}
          onClick={() => onDelete(user)}
        >
          🗑️
        </ActionButton>
      </td>
    </tr>
  );
}