import React, { useContext, useEffect, useState } from "react";
import {
  deleteProductAction,
  getProductsAction,
  productLoadingAction,
} from "../../../redux/Product/product.action";
import {
  ProductDispatchContext,
  ProductStateContext,
} from "../../../redux/Product/product.provider";
import { TableProvider } from "../../../components/widgets/table/TableProvider";
import { ViewProductModal } from "./ViewProductModal";
import { Table } from "../../../components";
import { toast } from "react-toastify";
import { titleCase } from "../../../utils/helpers";

const AllProd = () => {
  const [actionModal, setActionModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const formatProducts = (productData) => {
    const ProductList = Array.isArray(productData)
      ? productData?.map((product) => {
          return {
            id: product?.id,
            productName: product?.productName,
            categoryName: product?.categoryName,
            quantity: product?.quantity,
            price: product?.price,
            created_at: product?.createdTs,
          };
        })
      : [];
    return ProductList;
  };

  const { loading, products, meta } = useContext(ProductStateContext);

  const dispatch = useContext(ProductDispatchContext);

  const dispatchProducts = React.useCallback(
    async (pageQuery) => {
      dispatch(productLoadingAction(true));
      try {
        dispatch(await getProductsAction(pageQuery));
        dispatch(productLoadingAction(false));
      } catch (error) {
        console.log(
          error?.response?.message || error?.message || "Invoice Fatal error"
        );
        dispatch(productLoadingAction(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatchProducts();
  }, [dispatchProducts]);

  const handleDeleteProduct = async () => {
    try {
      await deleteProductAction(activeId);
      dispatch(productLoadingAction(true));
      dispatch(await getProductsAction());
      dispatch(productLoadingAction(false));
      toast.success("Product deleted successfully");
      setActionModal(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response.data.errors
          ? `${error.response.data.errors[0].message} for ${titleCase(
              error.response.data.errors[0].field
            )}`
          : "Something went wrong"
      );
      setActionModal(false);
    }
  };

  return (
    <TableProvider>
      <Table
        tableTitle="Products"
        tableData={formatProducts(products?.product)}
        tableCol={[
          "id",
          "productName",
          "categoryName",
          "quantity",
          "price",
          "created_at",
          "",
        ]}
        enableButton
        loading={loading}
        actionModal={actionModal}
        setActionModal={setActionModal}
        dispatchAction={dispatchProducts}
        handleDelete={handleDeleteProduct}
        setActiveId={setActiveId}
      />
      <ViewProductModal />
    </TableProvider>
  );
};
export default AllProd;
