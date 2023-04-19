import React, { createContext, useState } from "react";

export const TableContext = createContext({
  showModal: false,
  handleSetModal: () => {},
  activeTableId: null,
  handleSetActiveTable: (table) => {},
});

const TableProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeTableId, setActiveTableId] = useState(null);

  const handleSetModal = () => setShowModal((showModal) => !showModal);

  const handleSetActiveTable = (table) => setActiveTableId(table);

  return (
    <TableContext.Provider
      value={{ showModal, handleSetModal, activeTableId, handleSetActiveTable }}
    >
      {children}
    </TableContext.Provider>
  );
};

export { TableProvider };
