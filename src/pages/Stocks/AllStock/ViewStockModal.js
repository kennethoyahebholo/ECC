import { useContext, useEffect, useCallback } from "react";

import {
  StockDispatchContext,
  StockStateContext,
} from "../../../redux/Stock/stock.provider";
import { TableContext } from "../../../components/widgets/table/TableProvider";
import {
  findStockAction,
  getStocksAction,
  stockLoadingAction,
  updateStockAction,
} from "../../../redux/Stock/stock.action";
import { Button, FormSelect, Input } from "../../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const ViewStockModal = () => {
  const { showModal, handleSetModal, activeTableId } = useContext(TableContext);
  const stockStatusOption = [
    {
      value: "",
      title: "Select Role",
    },
    {
      value: 0,
      title: "Out of Stock",
    },
    {
      value: 1,
      title: "In Stock",
    },
  ];
  // console.log(activeTableId);
  const dispatch = useContext(StockDispatchContext);
  const { stock } = useContext(StockStateContext);
  //   const [isCopied, setIsCopied] = useState(false);

  //   const copyToClipboard = (e) => {
  //     setIsCopied(true);
  //     const text = e.currentTarget.getAttribute("data-clipboard-text");
  //     if (text) {
  //       navigator.clipboard.writeText(text);
  //       setTimeout(() => {
  //         setIsCopied(false);
  //       }, 2000);
  //     }
  //   };

  const dispatchFindStock = useCallback(async () => {
    try {
      dispatch(stockLoadingAction(true));
      dispatch(await findStockAction(activeTableId));
      dispatch(stockLoadingAction(false));
    } catch (error) {
      console.log(
        error?.response?.message || error?.message || "Customer Fatal error"
      );
      dispatch(stockLoadingAction(false));
    }
  }, [activeTableId, dispatch]);

  useEffect(() => {
    if (showModal) {
      dispatchFindStock();
      console.log(stock?.stock, "stock");
    }
  }, [dispatchFindStock, showModal]);

  const formik = useFormik({
    initialValues: {
      stockStatus: "",
      count: "",
      totalPrice: "",
      categoryId: "",
      productName: "",
      price: "",
      userId: "",
      description: "",
      weight: "",
      quantity: "",
      size: "",
    },
    validationSchema: Yup.object().shape({
      stockStatus: Yup.string().required("Stock status is required"),
      count: Yup.string().required("Count is required"),
      totalPrice: Yup.string().required("Total Price is required"),
      productName: Yup.string().required("Product Name is required"),
      categoryName: Yup.string().required("Category Name is required"),
      quantity: Yup.string().required("Quantity is required"),
      price: Yup.string().required("Price is required"),
      description: Yup.string().required("Description is required"),
      weight: Yup.string().required("Weight is required"),
      size: Yup.string().required("Size is required"),
    }),
    onSubmit: async (details) => {
      console.log(details);
      console.log(details);
      try {
        dispatch(
          await updateStockAction({
            stockStatus: details.stockStatus,
            count: details.count,
            totalPrice: details.totalPrice,
            product: {
              productName: details.productName,
              productDescription: details.description,
              price: details.price,
              size: details.size,
              quantity: details.quantity,
              weight: details.weight,
              userId: 0,
            },
          })
        );
        dispatch(stockLoadingAction(true));
        dispatch(await getStocksAction());
        toast.success("Product added successfully");
        // resetForm();
        //   triggerModal(false);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
        // resetForm();
        //   triggerModal(false);
      }
    },
  });

  //   useEffect(() => {
  //     if (stock?.stock) {
  //       stock?.stock?.map((data) => {
  //         formik.resetForm({
  //           productName: data?.productName,
  //           count: data?.count,
  //           price: data?.totalPrice,
  //           stockStatus: data?.stockStatus,
  //         });
  //       });
  //     }
  //   }, []);

  const handleCloseModal = () => {
    handleSetModal();
    formik.resetForm();
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-5">
          <div className=" w-[440px] bg-white pt-4 pb-8 flex flex-col gap-4 rounded-lg h-[680px] overflow-y-scroll">
            <div className="bg-gray-50 flex items-center justify-center rounded-t-lg"></div>
            <div className="px-8">
              {stock?.stock?.map((data) => {
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
                        Stock Count:{" "}
                        <small className="text-green-800">{data?.count}</small>
                      </span>
                      <span>
                        Total Price:{" "}
                        <small className="text-green-800">
                          ${data?.totalPrice}
                        </small>
                      </span>
                      <span>
                        Stock Status:{" "}
                        <small className="text-green-800">
                          {data?.stockStatus}
                        </small>
                      </span>
                      <h4 className="font-bold text-red-700">
                        Update this stock with the form
                      </h4>
                    </section>
                    <form key={data.id}>
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-md text-gray-300"
                        >
                          Product Name
                        </label>
                        <Input
                          size="md"
                          type="text"
                          id="productName"
                          name="productName"
                          value={formik.values.productName}
                          placeholder="Enter product name"
                          onChange={formik.handleChange}
                          className="w-full"
                        />
                        {formik.touched.productName &&
                          formik.errors.productName && (
                            <p className="text-red-900 text-[10px]">
                              {formik.errors.productName}
                            </p>
                          )}
                      </div>
                      <div>
                        <label
                          htmlFor="categoryName"
                          className="block text-md text-gray-300"
                        >
                          Product Category
                        </label>
                        <Input
                          size="md"
                          type="text"
                          id="categoryName"
                          name="categoryName"
                          value={formik.values.categoryName}
                          placeholder="Enter product category"
                          onChange={formik.handleChange}
                          className="w-full"
                        />
                        {formik.touched.categoryName &&
                          formik.errors.categoryName && (
                            <p className="text-red-900 text-[10px] ">
                              {formik.errors.categoryName}
                            </p>
                          )}
                      </div>
                      <div>
                        <label
                          htmlFor="quantity"
                          className="block text-md text-gray-300"
                        >
                          Quantity
                        </label>
                        <Input
                          size="md"
                          type="number"
                          id="quantity"
                          name="quantity"
                          value={formik.values.quantity}
                          placeholder="Enter product quantity"
                          onChange={formik.handleChange}
                          className="w-full"
                        />
                        {formik.touched.quantity && formik.errors.quantity && (
                          <p className="text-red-900 text-[10px] ">
                            {formik.errors.quantity}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="price"
                          className="block text-md text-gray-300"
                        >
                          Price
                        </label>
                        <Input
                          size="md"
                          type="number"
                          id="price"
                          name="price"
                          value={formik.values.price}
                          placeholder="Enter product price"
                          onChange={formik.handleChange}
                          className="w-full"
                        />
                        {formik.touched.price && formik.errors.price && (
                          <p className="text-red-900 text-[10px] ">
                            {formik.errors.price}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="count"
                          className="block text-md text-gray-300"
                        >
                          Count
                        </label>
                        <Input
                          size="md"
                          type="number"
                          id="count"
                          name="count"
                          value={formik.values.count}
                          placeholder="Enter product count"
                          onChange={formik.handleChange}
                          className="w-full"
                        />
                        {formik.touched.count && formik.errors.count && (
                          <p className="text-red-900 text-[10px] ">
                            {formik.errors.count}
                          </p>
                        )}
                      </div>
                      <div>
                        <FormSelect
                          required
                          size="md"
                          id="stockStatus"
                          name="stockStatus"
                          options={stockStatusOption}
                          label="Stock Status"
                          placeholder="Select Stock Status"
                          errors={formik.errors.stockStatus}
                          touched={formik.touched.stockStatus}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="totalPrice"
                          className="block text-md text-gray-300"
                        >
                          Total Price
                        </label>
                        <Input
                          size="md"
                          type="number"
                          id="totalPrice"
                          name="totalPrice"
                          value={formik.values.totalPrice}
                          placeholder="Enter total price"
                          onChange={formik.handleChange}
                          className="w-full"
                        />
                        {formik.touched.totalPrice &&
                          formik.errors.totalPrice && (
                            <p className="text-red-900 text-[10px] ">
                              {formik.errors.totalPrice}
                            </p>
                          )}
                      </div>
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-md text-gray-300"
                        >
                          Description
                        </label>
                        <Input
                          size="md"
                          type="string"
                          id="description"
                          name="description"
                          value={formik.values.description}
                          placeholder="Enter product description"
                          onChange={formik.handleChange}
                          className="w-full"
                        />
                        {formik.touched.description &&
                          formik.errors.description && (
                            <p className="text-red-900 text-[10px] ">
                              {formik.errors.description}
                            </p>
                          )}
                      </div>
                      <div>
                        <label
                          htmlFor="weight"
                          className="block text-md text-gray-300"
                        >
                          Weight
                        </label>
                        <Input
                          size="md"
                          type="number"
                          id="weight"
                          name="weight"
                          value={formik.values.weight}
                          placeholder="Enter product weight"
                          onChange={formik.handleChange}
                          className="w-full"
                        />
                        {formik.touched.weight && formik.errors.weight && (
                          <p className="text-red-900 text-[10px] ">
                            {formik.errors.weight}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="size"
                          className="block text-md text-gray-300"
                        >
                          Size
                        </label>
                        <Input
                          size="md"
                          type="number"
                          id="size"
                          name="size"
                          value={formik.values.size}
                          placeholder="Enter product size"
                          onChange={formik.handleChange}
                          className="w-full"
                        />
                        {formik.touched.size && formik.errors.size && (
                          <p className="text-red-900 text-[10px] ">
                            {formik.errors.size}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-between items-center px-10">
                        <Button variant="not-full" onClick={handleCloseModal}>
                          Cancel
                        </Button>
                        <Button
                          variant="full-green"
                          onClick={formik.handleSubmit}
                        >
                          Add
                        </Button>
                      </div>
                    </form>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { ViewStockModal };
