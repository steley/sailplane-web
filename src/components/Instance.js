import React, {useState} from 'react';
import {
  errorColor,
  primary2,
  primary3,
  primary4,
} from '../colors';
import useHover from '../hooks/useHover';
import {ToolItem} from './ToolItem';
import {FiEdit, FiTrash} from 'react-icons/fi';
import useTextInput from '../hooks/useTextInput';

export function Instance({data, selected, onClick, onDelete, onRename}) {
  const [hoverRef, isHovered] = useHover();
  const [editMode, setEditMode] = useState(false);
  const {name, address} = data;

  const InputComponent = useTextInput(
    editMode,
    (editNameValue) => onRename(editNameValue),
    () => setEditMode(false),
    name,
    {
      placeholder: '',
      actionTitle: 'Rename',
    },
  );
  const styles = {
    outer: {
      padding: 10,
      backgroundColor: selected ? primary3 : '#FFF',
      color: selected ? '#FFF' : primary4,
      border: `1px solid ${isHovered ? primary4 : primary3}`,
      borderRadius: 4,
      marginBottom: 4,
      fontFamily: 'Open Sans',
    },
    container: {
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    address: {
      marginLeft: 10,
      fontSize: 14,
      overflow: 'hidden',
    },
    tools: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: 10,
    },
  };

  return (
    <div style={styles.outer}>
      <div ref={hoverRef} style={styles.container} onClick={onClick}>
        <div>{editMode ? InputComponent : name}</div>
        <div style={styles.address}>{address}</div>
      </div>
      <div style={styles.tools}>
        <ToolItem
          defaultColor={selected ? primary2 : null}
          iconComponent={FiTrash}
          size={16}
          changeColor={errorColor}
          onClick={() => onDelete()}
        />
        <ToolItem
          defaultColor={selected ? primary2 : null}
          iconComponent={FiEdit}
          size={16}
          changeColor={primary4}
          onClick={() => setEditMode(true)}
        />
      </div>
    </div>
  );
}
