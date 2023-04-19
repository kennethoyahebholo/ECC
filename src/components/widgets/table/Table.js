import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  moneyFormat,
  titleCase,
  toDateFormat,
  truncate,
} from "../../../utils/helpers";
import { Button } from "../button";
import { Loader } from "../loader";
import AlertModal from "../../modules/modals/AlertModal";
import { ProductDispatchContext } from "../../../redux/Product/product.provider";
import {
  deleteProductAction,
  getProductsAction,
  productLoadingAction,
} from "../../../redux/Product/product.action";
import { TableContext } from "./TableProvider";

const Table = ({
  tableData,
  tableTitle,
  tableCol,
  enableButton,
  addButton,
  handleDelete,
  actionModal,
  setActionModal,
  setActiveId,
  setAddModal,
}) => {
  // const [actionModal, setActionModal] = useState(false);
  // const [activeId, setActiveId] = useState(null);
  const tableRef = useRef(null);

  const { handleSetModal, handleSetActiveTable } = useContext(TableContext);

  const handleOpenModalSetTable = (tableId) => {
    handleSetModal();
    handleSetActiveTable(tableId);
  };

  const showButton = enableButton ? enableButton : false;
  const columnData =
    tableCol && tableCol.length > 0
      ? tableCol
      : tableData.length > 0
      ? Object.keys(tableData[0])
      : [];
  const ThData = () => {
    return columnData?.map((data) => {
      return (
        <th className="text-md px-6 py-3" key={data}>
          {titleCase(data)}
        </th>
      );
    });
  };

  // const dispatch = useContext(ProductDispatchContext);

  // const handleDeleteProduct = async (pageQuery) => {
  //   try {
  //     await deleteProductAction(activeId);
  //     dispatch(productLoadingAction(true));
  //     dispatch(await getProductsAction(pageQuery));
  //     dispatch(productLoadingAction(false));
  //     toast.success("Product deleted successfully");
  //     setActionModal(false);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(
  //       error.response.data.errors
  //         ? `${error.response.data.errors[0].message} for ${titleCase(
  //             error.response.data.errors[0].field
  //           )}`
  //         : "Something went wrong"
  //     );
  //     setActionModal(false);
  //   }
  // };

  return (
    <div className="relative flex flex-col shadow-lg w-full">
      <div className="flex item-center justify-between p-6">
        <h3 className="text-lg">
          {tableTitle} <span>({tableData?.length})</span>
        </h3>
        {addButton && (
          <Button variant="not-full" onClick={() => setAddModal(true)}>
            Add {tableTitle}
          </Button>
        )}
      </div>
      {!tableData ? (
        "No Data Found"
      ) : (
        <div className="block bg-transparent overflow-x-auto">
          <table class="w-full overflow-x-auto" ref={tableRef}>
            <thead>
              <tr className="bg-slate-200 text-left">
                {ThData()}
                {/* {tableCol?.map((data) => (
                  <th key={data.id} className="text-md px-6 py-3">
                    {data.title}
                  </th>
                ))} */}
              </tr>
            </thead>
            <tbody>
              {Object.values(tableData).length > 0 ? (
                tableData?.map((data, index) => {
                  return (
                    <tr key={index}>
                      {Object.entries(data)?.map(([key, value], indexData) => {
                        if (indexData > columnData.length - 1) {
                          return null;
                        }
                        if (key === "amount" || key === "price") {
                          return (
                            <td key={key}>
                              <div className="flex">
                                <span className="text-md px-6 py-3">
                                  {moneyFormat(value)}
                                </span>
                              </div>
                            </td>
                          );
                        }

                        if (
                          key === "date" ||
                          key === "created_at" ||
                          key === "updated_at"
                        ) {
                          return (
                            <td key={key}>
                              <span className="text-md px-6 py-3">
                                {toDateFormat(value)}
                              </span>
                            </td>
                          );
                        }
                        return (
                          <td
                            className="text-md px-6 py-3"
                            title={value}
                            key={key}
                          >
                            {key === "productName" || key === ""
                              ? truncate(value, 12)
                              : value}
                          </td>
                        );
                      })}
                      {showButton ? (
                        <td className="text-white fs-6 text-end">
                          <button
                            onClick={() =>
                              handleOpenModalSetTable(data?.uuid || data?.id)
                            }
                            className="btn bg-green-600 btn-color-muted btn-active-color-primary btn-sm px-4 mr-2"
                          >
                            View
                          </button>
                          <button
                            // onClick={() =>
                            //   handleDeleteInvoice(data?.id || data?.uuid)
                            // }
                            onClick={() => {
                              setActionModal(true);
                              setActiveId(data?.uuid || data?.id);
                            }}
                            className="btn bg-red-800 btn-color-muted btn-active-color-white btn-sm px-4 mr-2"
                          >
                            Delete
                          </button>
                        </td>
                      ) : (
                        <></>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className="flex text-center w-100 items-center justify-center">
                      {/* {!loading ? (
                        <RequestInvoice />
                      ) : ( */}
                      <span
                        className="indicator-progress"
                        style={{ display: "block" }}
                      >
                        Please wait...
                        <Loader />
                      </span>
                      {/* )} */}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {actionModal && (
        <AlertModal
          title={`Delete ${tableTitle}?`}
          subTitle={`Are you sure you want to Delete ${tableTitle}?`}
          action={`Delete`}
          setOpenModal={setActionModal}
          handleAction={handleDelete}
        />
      )}
    </div>
  );
};

export default Table;
