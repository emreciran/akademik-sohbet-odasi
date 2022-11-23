import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      id="search"
      type="text"
      placeholder="Ara.."
      className="h-10 outline-none border rounded text-sm px-4 border-gray-300"
      value={filterText}
      onChange={onFilter}
    />
    <CloseIcon onClick={onClear} className='cursor-pointer'>X</CloseIcon>
  </>
);

export default FilterComponent;
