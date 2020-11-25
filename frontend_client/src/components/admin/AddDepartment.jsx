import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  MyTextInput,
  SpanError,
  LabelForm,
  LoadImage,
  UploadFileInput,
  UploadFileLabel,
} from "../styled/FormikInputs";
import {
  Divcenter,
  DivColumn,
  DivContainer,
  DivTriple,
} from "../styled/Containers";
import colors from "../../constants/colors";
import { SimpleButton } from "../styled/Buttons";
import { Title } from "../styled/Form";
import Icon from "../layout/Icon";
import ProgressBar from "./ProgressBar";

import { gql, useMutation, useQuery } from "@apollo/client";

const departmentSchemaValidation = Yup.object({
  title: Yup.string().required().min(6),
});

const ADD_DEPARTMENT_MUTATION = gql`
  mutation addDepartment($title: String!, $images: [String!]!) {
    addDepartment(title: $title, images: $images) {
      title
      images
      createdAt
      departmentId
    }
  }
`;

export const GET_DEPARMENTS = gql`
  query getDepartments {
    getDepartments {
      title
      departmentId
      categories {
        _id
        title
        subcategories {
          id
          name
        }
      }
      createdAt
      images
    }
  }
`;

const AddDepartment = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [file2, setFile2] = useState(null);
  const [fileUrl2, setFileUrl2] = useState("");
  const [file3, setFile3] = useState(null);
  const [fileUrl3, setFileUrl3] = useState("");

  const { data } = useQuery(GET_DEPARMENTS);

  const [department, { loading }] = useMutation(ADD_DEPARTMENT_MUTATION, {
    onCompleted: (data) => console.log(data),
    onError: (err) => setError(err),
    update: (cache, { data }) => {
      const newData = data.addDepartment;
      const existingDepartments = cache.readQuery({
        query: GET_DEPARMENTS,
      });

      console.log("new data from request ----", newData);
      console.log(
        "existing data from cache",
        existingDepartments.getDepartments
      );

      if (newData && existingDepartments) {
        cache.writeQuery({
          query: GET_DEPARMENTS,
          data: {
            getDepartments: [...existingDepartments.getDepartments, newData],
          },
        });
      }
    },
  });

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

  // if (departments.loading) {
  //   return <h1>Data is loading</h1>;
  // }

  return (
    <Divcenter>
      <DivContainer shadow={true} height={100} width={100}>
        <Title size={2} color={colors.mainOrange}>
          Add A New Department
        </Title>
        <Formik
          initialValues={{
            title: "",
          }}
          validateOnBlur={true}
          validationSchema={departmentSchemaValidation}
          onSubmit={async (values, actions) => {
            await department({
              variables: {
                title: values.title,
                images: [fileUrl, fileUrl2, fileUrl3],
              },
            });

            setFile(null);
            setFile2(null);
            setFile3(null);
            setFileUrl(null);
            setFileUrl2(null);
            setFileUrl3(null);

            actions.resetForm();
          }}
        >
          {(formikProps) => (
            <Form autoComplete="Off" onSubmit={formikProps.handleSubmit}>
              <DivColumn center={true}>
                <MyTextInput
                  label="Department Title :"
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
                <Divcenter>
                  <DivTriple
                    maxHeight={500}
                    height={100}
                    width={100}
                    percentaje={true}
                  >
                    <div>
                      <div style={{ display: "flex" }}>
                        <LabelForm font={1.1}>
                          Select the first image:{" "}
                        </LabelForm>
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

                      {error && (
                        <SpanError className="error">{error}</SpanError>
                      )}
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
                          />
                        )}
                      </Divcenter>
                    </div>
                    <div>
                      <div style={{ display: "flex" }}>
                        <LabelForm font={1.1}>
                          Select the second image:{" "}
                        </LabelForm>
                        <UploadFileInput
                          type="file"
                          name="file2"
                          id="file2"
                          onChange={(e) => {
                            const selected = e.target.files[0];

                            if (selected && types.includes(selected.type)) {
                              setFile2(selected);
                              setError("");
                            } else {
                              setFile2(null);
                              setError(
                                "Please select an image file (png or jpg)"
                              );
                            }
                          }}
                        />
                        <UploadFileLabel for="file2">
                          <Icon icon_name="fas fa-camera-retro" /> Upload
                        </UploadFileLabel>
                      </div>
                      {error && (
                        <SpanError className="error">{error}</SpanError>
                      )}
                      {file2 && (
                        <ProgressBar
                          file={file2}
                          setFile={setFile2}
                          setFileUrl={setFileUrl2}
                        />
                      )}
                      <Divcenter>
                        {fileUrl2 && (
                          <LoadImage
                            src={fileUrl2}
                            alt="first user file selection"
                            margin={0.4}
                          />
                        )}
                      </Divcenter>
                    </div>
                    <div>
                      <div style={{ display: "flex" }}>
                        <LabelForm font={1.1}>
                          Select the third image:{" "}
                        </LabelForm>
                        <UploadFileInput
                          type="file"
                          name="file3"
                          id="file3"
                          onChange={(e) => {
                            const selected = e.target.files[0];

                            if (selected && types.includes(selected.type)) {
                              setFile3(selected);
                              setError("");
                            } else {
                              setFile3(null);
                              setError(
                                "Please select an image file (png or jpg)"
                              );
                            }
                          }}
                        />
                        <UploadFileLabel for="file3">
                          <Icon icon_name="fas fa-camera-retro" /> Upload
                        </UploadFileLabel>
                      </div>
                      {error && (
                        <SpanError className="error">{error}</SpanError>
                      )}
                      {file3 && (
                        <ProgressBar
                          file={file3}
                          setFile={setFile3}
                          setFileUrl={setFileUrl3}
                        />
                      )}
                      <Divcenter>
                        {fileUrl3 && (
                          <LoadImage
                            src={fileUrl3}
                            alt="first user file selection"
                            margin={0.4}
                          />
                        )}
                      </Divcenter>
                    </div>
                  </DivTriple>
                </Divcenter>

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
        {data &&
          data.getDepartments.map((department) => (
            <h1 key={department.departmentId}> {department.title} </h1>
          ))}
      </DivContainer>
    </Divcenter>
  );
};

export default AddDepartment;
