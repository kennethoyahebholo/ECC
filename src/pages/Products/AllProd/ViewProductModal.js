import { useContext, useEffect, useCallback } from "react";
import {
  ProductDispatchContext,
  ProductStateContext,
} from "../../../redux/Product/product.provider";
import { TableContext } from "../../../components/widgets/table/TableProvider";
import {
  findProductAction,
  productLoadingAction,
} from "../../../redux/Product/product.action";

const ViewProductModal = () => {
  const { showModal, handleSetModal, activeTableId } = useContext(TableContext);
  const dispatch = useContext(ProductDispatchContext);
  const { product } = useContext(ProductStateContext);

  const dispatchFindProduct = useCallback(async () => {
    try {
      dispatch(productLoadingAction(true));
      dispatch(await findProductAction(activeTableId));
      dispatch(productLoadingAction(false));
    } catch (error) {
      console.log(
        error?.response?.message || error?.message || "Customer Fatal error"
      );
      dispatch(productLoadingAction(false));
    }
  }, [activeTableId, dispatch]);

  useEffect(() => {
    if (showModal) {
      dispatchFindProduct();
    }
  }, [dispatchFindProduct, showModal]);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-5">
          <div className="h-[406px] w-[440px] bg-white pb-4 flex flex-col gap-8 rounded-lg px-8">
            <div className="bg-gray-50 flex items-center justify-center rounded-t-lg"></div>
            {product?.product?.map((data) => {
              return (
                <div>
                  <section className="flex flex-col">
                    <span>
                      Product Name:{" "}
                      <small className="text-green-800">
                        {data?.productName}
                      </small>
                    </span>
                    <span>
                      Category Name:{" "}
                      <small className="text-green-800">
                        {data?.categoryName}
                      </small>
                    </span>
                    <span>
                      quantity:{" "}
                      <small className="text-green-800">
                        ${data?.quantity}
                      </small>
                    </span>
                    <span>
                      Price:{" "}
                      <small className="text-green-800">{data?.price}</small>
                    </span>
                  </section>
                </div>
              );
            })}
            <div className="flex items-center justify-between">
              <button
                onClick={handleSetModal}
                className="bg-white border-2 border-green-500 rounded-md py-2 px-4 text-green"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { ViewProductModal };
