import { Button } from "bootstrap";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Input } from "../../../components";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  addProductAction,
  getProductsAction,
  productLoadingAction,
} from "../../../redux/Product/product.action";
import { TableContext } from "../../../components/widgets/table/TableProvider";
import { ProductDispatchContext } from "../../../redux/Product/product.provider";
import AddItemModal from "../../../components/modules/modals/AddItemModal";

const AddProductModal = ({ triggerModal }) => {
  const { showModal, handleSetModal, activeTableId } = useContext(TableContext);
  const dispatch = useContext(ProductDispatchContext);
  const formik = useFormik({
    initialValues: {
      productName: "",
      categoryName: "",
      quantity: "",
      price: "",
      description: "",
      weight: "",
      size: "",
    },
    validationSchema: Yup.object().shape({
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
          await addProductAction({
            categoryId: 0,
            productName: details.productName,
            imageName: "",
            price: details.price,
            userId: 0,
            productDescription: details.description,
            weight: details.weight,
            quantity: details.quantity,
            size: details.size,
          })
        );
        dispatch(productLoadingAction(true));
        dispatch(await getProductsAction());
        toast.success("Product added successfully");
        resetForm();
        triggerModal(false);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
        resetForm();
        triggerModal(false);
      }
    },
  });
  return (
    <>
      {showModal && (
        <AddItemModal>
          <div>
            <h2>Add Product</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-3 mt-8">
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
                  <p className="text-red-900 text-[10px] ">
                    {formik.errors.price}
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
                  <p className="text-red-900 text-[10px] ">
                    {formik.errors.size}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center px-10">
                <Button variant="not-full" onClick={handleSetModal}>
                  Cancel
                </Button>
                <Button variant="full-green" onClick={formik.handleSubmit}>
                  Add
                </Button>
              </div>
            </form>
          </div>
        </AddItemModal>
      )}
    </>
  );
};

export default AddProductModal;
