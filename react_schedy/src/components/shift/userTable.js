import React from 'react';
import PropTypes from 'prop-types';
import UserTableOptions from './userTableOptions';

function UserTable({ name, picture, pos, onEdit }) {
  return (
    <UserTableOptions name={name} picture={picture} pos={pos} onEdit={onEdit} />
  );
}

UserTable.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  pos: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default UserTable;
