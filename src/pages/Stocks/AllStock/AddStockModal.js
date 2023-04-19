import { useFormik } from "formik";
import React, { useContext } from "react";
import { Button, FormSelect, Input } from "../../../components";
import AddItemModal from "../../../components/modules/modals/AddItemModal";
import { StockDispatchContext } from "../../../redux/Stock/stock.provider";
import * as Yup from "yup";
import {
  addStockAction,
  getStocksAction,
  stockLoadingAction,
} from "../../../redux/Stock/stock.action";
import { toast } from "react-toastify";

const AddStockModal = ({ handleCloseModal }) => {
  const dispatch = useContext(StockDispatchContext);
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
    onSubmit: async (details, { resetForm }) => {
      console.log(details);
      try {
        dispatch(
          await addStockAction({
            stockStatus: details.stockStatus,
            count: details.count,
            totalPrice: details.totalPrice,
            product: {
              categoryId: 5,
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
  return (
    <AddItemModal>
      <div>
        <h2>Add Stock</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-3 mt-8">
          <div>
            <label htmlFor="fullName" className="block text-md text-gray-300">
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
            {formik.touched.productName && formik.errors.productName && (
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
            {formik.touched.categoryName && formik.errors.categoryName && (
              <p className="text-red-900 text-[10px] ">
                {formik.errors.categoryName}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="quantity" className="block text-md text-gray-300">
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
            <label htmlFor="price" className="block text-md text-gray-300">
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
              <p className="text-red-900 text-[10px] ">{formik.errors.price}</p>
            )}
          </div>
          <div>
            <label htmlFor="count" className="block text-md text-gray-300">
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
              <p className="text-red-900 text-[10px] ">{formik.errors.count}</p>
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
            <label htmlFor="totalPrice" className="block text-md text-gray-300">
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
            {formik.touched.totalPrice && formik.errors.totalPrice && (
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
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-900 text-[10px] ">
                {formik.errors.description}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="weight" className="block text-md text-gray-300">
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
            <label htmlFor="size" className="block text-md text-gray-300">
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
              <p className="text-red-900 text-[10px] ">{formik.errors.size}</p>
            )}
          </div>
          <div className="flex justify-between items-center px-10">
            <Button variant="not-full" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="full-green" onClick={formik.handleSubmit}>
              Add
            </Button>
          </div>
        </form>
      </div>
    </AddItemModal>
  );
};

export default AddStockModal;
