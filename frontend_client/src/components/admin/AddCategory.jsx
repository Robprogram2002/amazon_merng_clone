import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  MyTextInput,
  SpanError,
  LabelForm,
  LoadImage,
  UploadFileInput,
  UploadFileLabel,
} from "../styled/FormikInputs";
import { Divcenter, DivColumn, DivContainer } from "../styled/Containers";
import colors from "../../constants/colors";
import { SimpleButton, TransparentButton } from "../styled/Buttons";
import { Title } from "../styled/Form";
import Icon from "../layout/Icon";
import ProgressBar from "./ProgressBar";
import { GET_DEPARMENTS } from "./AddDepartment";

import { gql, useMutation, useQuery } from "@apollo/client";
import uuidV4 from "uuid/dist/v4";

const ValidationSchema = Yup.object({
  title: Yup.string().required().min(6),
  departmentId: Yup.string().required(
    "It´s necessary select an existing department"
  ),
});

const ADD_CATEGORY_MUTATION = gql`
  mutation addCategory(
    $title: String!
    $image: String!
    $subcategories: [SubcategoryInput!]
    $departmentId: ID!
  ) {
    addCategory(
      title: $title
      image: $image
      subcategories: $subcategories
      departmentId: $departmentId
    ) {
      title
      image
      subcategories {
        name
        id
      }
      createdAt
      departmentId
      categoryId
    }
  }
`;

function AddCategory() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [subcategoriesCount, setSubcategoriesCount] = useState(0);

  const [addCategory, { loading }] = useMutation(ADD_CATEGORY_MUTATION, {
    onCompleted: (data) => console.log(data),
    onError: (err) => setError(err),
  });

  const departments = useQuery(GET_DEPARMENTS);

  const types = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  const handleSubcategory = (e) => {
    e.preventDefault();
    if (subcategoriesCount === 0) {
      setSubcategoriesCount(1);
    } else {
      setSubcategoriesCount((prevState) => prevState + 1);
    }
  };

  return (
    <Divcenter>
      <DivContainer shadow={true} height={100} width={100}>
        <Title size={2} color={colors.mainOrange}>
          Add A New Category
        </Title>
        <Formik
          initialValues={{
            title: "",
            departmentId: "",
          }}
          validateOnBlur={true}
          validationSchema={ValidationSchema}
          onSubmit={async (values, actions) => {
            let subcategories = [
              values.subcategory1 && {
                name: values.subcategory1,
                id: uuidV4(),
              },
              values.subcategory2 && {
                name: values.subcategory2,
                id: uuidV4(),
              },
              values.subcategory3 && {
                name: values.subcategory3,
                id: uuidV4(),
              },
              values.subcategory4 && {
                name: values.subcategory4,
                id: uuidV4(),
              },
              values.subcategory5 && {
                name: values.subcategory5,
                id: uuidV4(),
              },
            ];

            subcategories = subcategories.filter(
              (element) => element !== undefined
            );

            await addCategory({
              variables: {
                title: values.title,
                image: fileUrl,
                departmentId: values.departmentId,
                subcategories: subcategories,
              },
            });

            actions.resetForm();
            setFile(null);
            setFileUrl("");
            setSubcategoriesCount(0);
          }}
        >
          {(formikProps) => (
            <Form autoComplete="Off" onSubmit={formikProps.handleSubmit}>
              <DivColumn center={true}>
                <LabelForm>Select an existing department</LabelForm>
                <Field name="departmentId" as="select">
                  {departments.data &&
                    departments.data.getDepartments.map((department) => (
                      <option value={department.departmentId}>
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
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <LabelForm font={1.4}>Select the first image: </LabelForm>
                    <UploadFileInput
                      type="file"
                      name="file"
                      id="file"
                      onChange={handleChange}
                    />
                    <UploadFileLabel for="file">
                      <Icon icon_name="fas fa-camera-retro" /> Upload
                    </UploadFileLabel>
                  </div>

                  {error && <SpanError className="error">{error}</SpanError>}
                  {file && (
                    <ProgressBar
                      file={file}
                      setFile={setFile}
                      setFileUrl={setFileUrl}
                    />
                  )}
                  <Divcenter>
                    {fileUrl && (
                      <LoadImage
                        src={fileUrl}
                        alt="first user file selection"
                        margin={0.4}
                        maxHeight={400}
                        maxWidth={800}
                      />
                    )}
                  </Divcenter>
                  {console.log(formikProps.errors)}
                  <TransparentButton
                    color="green"
                    width={300}
                    onClick={handleSubcategory}
                  >
                    <Icon color="green" icon_name="fas fa-plus" /> Add a
                    subcategory
                  </TransparentButton>
                </div>
                {subcategoriesCount > 0 &&
                  Array(subcategoriesCount)
                    .fill()
                    .map((x, index) => (
                      <MyTextInput
                        label={`Subcategory title (${index + 1}) :`}
                        name={"subcategory" + (index + 1)}
                        type="text"
                        height={34}
                        width={95}
                        placeholder="Begin tiping here..."
                        font={1.4}
                      />
                    ))}
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
}

export default AddCategory;
