import { gql, useMutation, useQuery } from "@apollo/client";
import * as Yup from "yup";
import React, { useState } from "react";
import {
  Divcenter,
  DivColumn,
  DivContainer,
  DivDouble,
  DivTriple,
} from "../styled/Containers";
import { Title } from "../styled/Form";
import colors from "../../constants/colors";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import {
  LabelForm,
  MyTextInput,
  UploadFileInput,
  UploadFileLabel,
  LoadImage,
  MyNumberInput,
} from "../styled/FormikInputs";
import { GET_DEPARMENTS } from "./AddDepartment";
import { SimpleButton, TransparentButton } from "../styled/Buttons";
import AdminCKEditor from "./AdminCKEditor";
import ProgressBar from "./ProgressBar";
import Icon from "../layout/Icon";

const GET_SELLERS_QUERY = gql`
  query getSellers {
    getSellers {
      companyName
      sellerId
    }
  }
`;

const ADD_PRODUCT_MUTATION = gql`
  mutation addProduct(
    $sellerId: ID!
    $departmentId: ID!
    $categoryId: ID!
    $subcategoryId: String
    $title: String!
    $description: String!
    $images: [String!]!
    $price: Float!
    $stock: Int!
    $brand: String!
    $caracteristicas: [String!]!
    $prime: Boolean!
  ) {
    addProduct(
      sellerId: $sellerId
      departmentId: $departmentId
      categoryId: $categoryId
      subcategoryId: $subcategoryId
      title: $title
      description: $description
      images: $images
      price: $price
      stock: $stock
      brand: $brand
      caracteristicas: $caracteristicas
      prime: $prime
    ) {
      sellerId
      departmentId
      categoryId
      subcategoryId
      title
      rating
      questions
      comments
      images
      description
      createdAt
      productId
      prime
      price
      stock
    }
  }
`;

const ProductSchemaValidation = Yup.object({
  title: Yup.string().required().min(6).max(300),
  price: Yup.number().min(1).max(10000000).positive().required(),
  stock: Yup.number().min(0).max(100000).positive().truncate().required(),
  brand: Yup.string().required(),
  prime: Yup.boolean(),
  departmentId: Yup.string().required("It's necessary select a department"),
  categoryId: Yup.string().required("It's necessary select a category"),
  subcategoryId: Yup.string().required("It's necessary select a subcategory"),
  sellerId: Yup.string().required(
    "It's necessary select a seller for the product"
  ),
});

// const GET_DEPARTMENT_QUERY = gql`
//   mutation getDepartments (departmentId: ID!) {
//     getDepartments(
//       departmentId: $departmentId
//     ) {
//     title
//     departmentId
//     categories
//     createdAt
//     images
//   }
//   }
// `

const CreateProduct = () => {
  const [addProduct, { loading }] = useMutation(ADD_PRODUCT_MUTATION, {
    onCompleted: (data) => console.log(data),
  });
  const [categories, setCategories] = useState(null);
  const [subcategories, setSubcategories] = useState(null);
  const [descriptionData, setDescriptionData] = useState("");
  const [images, setImages] = useState({});
  const [imageFile, setImageFile] = useState({});
  const [error, setError] = useState(null);
  const [imageCount, setImageCount] = useState(6);
  const [textCount, setTextCount] = useState(0);

  error && console.error(error);

  const departments = useQuery(GET_DEPARMENTS, {
    onError: (error) => console.log(error),
    // onCompleted: (data) => console.log(data.getDepartments),
  });

  const sellers = useQuery(GET_SELLERS_QUERY, {
    // onCompleted: (data) => console.log(data.getSellers),
  });

  const handlerDepartmentId = (id) => {
    const selectedDepartment = departments.data.getDepartments.filter(
      (department) => department.departmentId === id
    )[0];

    setCategories(selectedDepartment.categories);
  };

  const handlerCategoryId = (id) => {
    const selectedCategory = categories.filter(
      (category) => category._id === id
    )[0];

    if (selectedCategory && selectedCategory.subcategories) {
      setSubcategories(selectedCategory.subcategories);
    }
  };

  const types = ["image/png", "image/jpeg"];

  const imageHanlder = (e, round) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setImageFile((prevState) => {
        const name = "file_" + round;
        const newState = { ...prevState };
        newState[name] = selected;

        return newState;
      });
      setError("");
    } else {
      setImageFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  // const [getDepartment, {loading}] = useLazyQuery()

  // const handleSelectedDepartment = (event) => {
  //   const departmentId = event.target.value;
  //   console.log(departmentId);
  // };

  return (
    <Divcenter>
      <DivContainer shadow={true} height={100} width={100}>
        <Title size={2} color={colors.mainOrange}>
          Add A New Category
        </Title>
        <Formik
          initialValues={{
            departmentId: "",
            categoryId: "",
            subcategoryId: "",
            sellerId: "",
            caracteristics: [],
            title: "",
            price: 0.0,
            stock: 0,
            brand: "",
            prime: false,
            discount: 0.0,
          }}
          validateOnBlur={true}
          validationSchema={ProductSchemaValidation}
          onSubmit={async (values, actions) => {
            await addProduct({
              variables: {
                departmentId: values.departmentId,
                categoryId: values.categoryId,
                subcategoryId: values.subcategoryId,
                sellerId: values.sellerId,
                caracteristicas: values.caracteristics,
                title: values.title,
                description: descriptionData,
                images: Object.values(images),
                price: values.price,
                stock: values.stock,
                prime: values.prime ? true : false,
                brand: values.brand,
              },
            });

            setCategories(null);
            setSubcategories(null);
            setImages({});
            setImageFile({});
            setTextCount(0);
            setImageCount(6);
            setDescriptionData("");
            actions.resetForm();

            // A BETTER WAY OF DO THE SAME ABOVE CODE

            // const data = {
            //   ...values,
            //   prime: values.prime ? true : false,
            //   caracteristicas: values.caracteristics,
            //   description: descriptionData,
            //   images: Object.values(images),
            // };

            // if (!values.subcategoryId) {
            //   data["subcategoryId"] = null;
            // }
          }}
        >
          {(formikProps) => (
            <Form autoComplete="Off" onSubmit={formikProps.handleSubmit}>
              <DivColumn center={true}>
                <LabelForm>Select an existing department</LabelForm>
                <Field
                  name="departmentId"
                  as="select"
                  onClick={() =>
                    formikProps.values.departmentId &&
                    handlerDepartmentId(formikProps.values.departmentId)
                  }
                >
                  <option></option>
                  {departments.data &&
                    departments.data.getDepartments.map((department) => (
                      <option
                        value={department.departmentId}
                        key={department.departmentId}
                      >
                        {department.title}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="departmentId"
                  component="span"
                  style={{ color: "red" }}
                />
                <br />
                <LabelForm>Select an category </LabelForm>

                <Field
                  name="categoryId"
                  as="select"
                  onClick={() =>
                    formikProps.values.categoryId &&
                    handlerCategoryId(formikProps.values.categoryId)
                  }
                >
                  {categories ? (
                    <>
                      <option></option>
                      {categories.map((category) => (
                        <option value={category._id} key={category._id}>
                          {category.title}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option>...</option>
                  )}
                </Field>
                <ErrorMessage
                  name="categoryId"
                  component="span"
                  style={{ color: "red" }}
                />
                <br />
                <LabelForm>Select an subcategory </LabelForm>

                <Field name="subcategoryId" as="select">
                  {subcategories ? (
                    <>
                      <option></option>
                      {subcategories.map((subcategory) => (
                        <option value={subcategory.id} key={subcategory.id}>
                          {subcategory.name}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option>...</option>
                  )}
                </Field>
                <ErrorMessage
                  name="subcategoryId"
                  component="span"
                  style={{ color: "red" }}
                />
                <br />
                <LabelForm>Select the seller</LabelForm>
                <Field name="sellerId" as="select">
                  <option></option>
                  {sellers.data &&
                    sellers.data.getSellers.map((seller) => (
                      <option value={seller.sellerId} key={seller.sellerId}>
                        {seller.companyName}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="sellerId"
                  component="span"
                  style={{ color: "red" }}
                />
                <br />
                <MyTextInput
                  label="Category Title :"
                  name="title"
                  type="text"
                  height={34}
                  width={95}
                  placeholder="Begin tiping here..."
                  font={1.4}
                  error={
                    formikProps.errors.title && formikProps.touched.title
                      ? true
                      : false
                  }
                />
                <br />
                <LabelForm font={1.4}>Add the product's description</LabelForm>
                <AdminCKEditor
                  setData={setDescriptionData}
                  dataEditor={descriptionData}
                  placeholder="Begin tiping a description here ..."
                />
                <br />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <LabelForm>Select the images for the product</LabelForm>
                  <TransparentButton
                    color="green"
                    type="button"
                    width={200}
                    onClick={() =>
                      setImageCount((prevState) =>
                        prevState <= 12 ? prevState + 1 : prevState
                      )
                    }
                  >
                    <Icon color="green" icon_name="fas fa-plus" />
                    Add another image
                  </TransparentButton>
                </div>
                <Divcenter>
                  <DivTriple
                    height={100}
                    width={100}
                    percentaje={true}
                    style={{
                      gridTemplateRows: "1fr",
                      marginTop: "1rem",
                      gap: "2rem 0rem",
                    }}
                  >
                    {Array(imageCount)
                      .fill()
                      .map((_, index) => (
                        <div key={index}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <LabelForm font={1.4}>
                              Image ({index + 1})
                            </LabelForm>
                            <UploadFileInput
                              type="file"
                              name={"file_" + (index + 1)}
                              id={"file_" + (index + 1)}
                              onChange={(e) => imageHanlder(e, index + 1)}
                            />
                            <UploadFileLabel for={"file_" + (index + 1)}>
                              <Icon icon_name="fas fa-camera-retro" /> Upload
                            </UploadFileLabel>
                          </div>

                          {imageFile["file_" + (index + 1)] && (
                            <ProgressBar
                              file={imageFile["file_" + (index + 1)]}
                              setFile={setImageFile}
                              setFileUrl={setImages}
                              images={true}
                              count={index + 1}
                            />
                          )}
                          <Divcenter>
                            {images["image_" + (index + 1)] && (
                              <LoadImage
                                src={images["image_" + (index + 1)]}
                                alt="first user file selection"
                                margin={0.4}
                                maxHeight={300}
                                maxWidth={600}
                              />
                            )}
                          </Divcenter>
                        </div>
                      ))}
                  </DivTriple>
                </Divcenter>
                <DivDouble style={{ marginTop: "2rem" }}>
                  <MyNumberInput
                    label="Product Price :"
                    name="price"
                    type="number"
                    step={100}
                    height={34}
                    width={95}
                    font={1.4}
                    error={
                      formikProps.errors.price && formikProps.touched.price
                        ? true
                        : false
                    }
                  />
                  <MyNumberInput
                    label="Product Stock :"
                    name="stock"
                    type="number"
                    height={34}
                    width={95}
                    font={1.4}
                    error={
                      formikProps.errors.stock && formikProps.touched.stock
                        ? true
                        : false
                    }
                  />
                </DivDouble>
                <DivDouble style={{ marginTop: "2rem" }}>
                  <div>
                    <MyTextInput
                      label="Product Brand :"
                      name="brand"
                      type="text"
                      height={34}
                      width={95}
                      placeholder="Begin tiping here..."
                      font={1.4}
                      error={
                        formikProps.errors.brand && formikProps.touched.brand
                          ? true
                          : false
                      }
                    />
                  </div>

                  <div>
                    <LabelForm font={1.4}>Select one</LabelForm>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        padding: ".2rem 1rem",
                      }}
                    >
                      <label>
                        <Field type="checkbox" name="prime" value={true} />
                        Prime Product
                      </label>
                      <label>
                        <Field
                          type="checkbox"
                          name="checked"
                          value="notPrime"
                        />
                        Normal Product
                      </label>
                    </div>
                  </div>
                </DivDouble>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LabelForm>Add product's caracteristics</LabelForm>
                  <TransparentButton
                    color="green"
                    type="button"
                    width={60}
                    onClick={() =>
                      setTextCount((prevState) =>
                        prevState <= 5 ? prevState + 1 : prevState
                      )
                    }
                  >
                    <Icon color="green" icon_name="fas fa-plus" />
                  </TransparentButton>
                </div>
                <FieldArray name="caracteristics">
                  {() => (
                    <DivDouble
                      style={{ gridTemplateRows: "1fr", gap: "1rem 0rem" }}
                    >
                      {textCount > 0 &&
                        Array(textCount)
                          .fill()
                          .map((_, index) => (
                            <div>
                              <MyTextInput
                                label={`caracteristic (${index + 1})`}
                                name={`caracteristics.${index}`}
                                type="text"
                                height={34}
                                width={95}
                                placeholder="Begin tiping here..."
                                font={1.4}
                              />
                            </div>
                          ))}
                    </DivDouble>
                  )}
                </FieldArray>
                <br />
                <MyNumberInput
                  label="Product Distcount (percentaje) :"
                  name="discount"
                  type="number"
                  height={34}
                  width={25}
                  font={1.4}
                />
                <br />
                <br />
                <Divcenter>
                  <SimpleButton
                    type="submit"
                    // onClick={() => formikProps.handleSubmit()}
                    color={colors.darkBlue}
                    background={colors.mainOrange}
                    padding={0.6}
                    width={200}
                    height={40}
                    margin={1}
                  >
                    {loading ? "Loading ..." : "Submit"}
                  </SimpleButton>
                </Divcenter>
              </DivColumn>
            </Form>
          )}
        </Formik>
      </DivContainer>
    </Divcenter>
  );
};

export default CreateProduct;
