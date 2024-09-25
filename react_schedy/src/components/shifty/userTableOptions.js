import React, { useState } from 'react';
import PropTypes from 'prop-types';
import picUser1 from '../../pic/user1.png';
import { ReplaceableWorkersDropdown } from './replaceableWorkersDropdown';
import Pic from '../../context/workerPic.js'


function UserTableOptions({ currentWorker, pos, onDelete, onReplace, rowData, }) {
  const [selected, setSelected] = useState(currentWorker);
  const { replaceableWorkers } = rowData || {};

  const onWorkerEdit = (newValue) => {
    setSelected(newValue);
    onReplace(newValue);
  };

  const deleteWorker =() => {
    alert(`Deleted ${currentWorker.fullName}`)
    onDelete(currentWorker);
  }

  return (
    <div className="td-person">

      <ReplaceableWorkersDropdown replaceableWorkers={replaceableWorkers} onEdit={onWorkerEdit}>
      <div className="td-person"> 
      <div className='ReplacePic'>
                <button className="delete" onClick={deleteWorker}>⛔️</button>        
            </div>
            <div className='ReplacePic'>
                {/* <img src={picUser1} alt={selected.fullName} /> */}
                <Pic id={currentWorker.id} />
            </div>
     
            <div className='ReplaceTd'>
                <span>{selected.fullName || ''}</span>
            </div>


        </div>
      </ReplaceableWorkersDropdown>




    </div>
  );
}

UserTableOptions.propTypes = {
  currentWorker: PropTypes.object,
  pos: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default UserTableOptions;

