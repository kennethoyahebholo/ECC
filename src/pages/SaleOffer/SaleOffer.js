import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Table } from "../../components";
import { TableProvider } from "../../components/widgets/table/TableProvider";
import {
  deleteSaleOfferAction,
  getSaleOffersAction,
  saleOfferLoadingAction,
} from "../../redux/SaleOffer/sale-offer.action";
import {
  SaleOfferDispatchContext,
  SaleOfferStateContext,
} from "../../redux/SaleOffer/sale-offer.provider";
import { titleCase } from "../../utils/helpers";

const SaleOffer = () => {
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

  const { loading, saleOffers, meta } = useContext(SaleOfferStateContext);

  const dispatch = useContext(SaleOfferDispatchContext);

  const dispatchSaleOffers = React.useCallback(
    async (pageQuery) => {
      dispatch(saleOfferLoadingAction(true));
      try {
        dispatch(await getSaleOffersAction(pageQuery));
        dispatch(saleOfferLoadingAction(false));
      } catch (error) {
        console.log(
          error?.response?.message || error?.message || "Invoice Fatal error"
        );
        dispatch(saleOfferLoadingAction(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatchSaleOffers();
  }, [dispatchSaleOffers]);

  const handleDeleteProduct = async () => {
    try {
      await deleteSaleOfferAction(activeId);
      dispatch(saleOfferLoadingAction(true));
      dispatch(await getSaleOffersAction());
      dispatch(saleOfferLoadingAction(false));
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
        tableTitle="Sale Offer"
        tableData={formatProducts(saleOffers?.saleOffer)}
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
        dispatchAction={dispatchSaleOffers}
        handleDelete={handleDeleteProduct}
        setActiveId={setActiveId}
      />
    </TableProvider>
  );
};

export default SaleOffer;
