import React, { useState } from "react";
import RegisterForm from "../components/auth/RegisterForm";
import {
  Divcenter,
  DivColumn,
  DivContainer,
  DivDouble,
} from "../components/styled/Containers";
import { initialSingUpValues, registerSchema } from "./LoginPage";
import { CustomH2 } from "../components/auth/LoginIlustration";
import styled, { css } from "styled-components";
import { Form, Formik } from "formik";
// import { Title } from "../components/styled/Form";
import colors from "../constants/colors";
import * as Yup from "yup";
import {
  LabelForm,
  MyTextInput,
  SpanError,
  UploadFileInput,
  UploadFileLabel,
  LoadImage,
} from "../components/styled/FormikInputs";
import Icon from "../components/layout/Icon";
import ProgressBar from "../components/admin/ProgressBar";
import { SimpleButton, TransparentButton } from "../components/styled/Buttons";
import { DivField } from "../components/styled/Form";
import AdminCKEditor from "../components/admin/AdminCKEditor";
import { useMutation, gql } from "@apollo/client";

const SellerSchema = Yup.object({
  companyName: Yup.string()
    .required("The company's name is required")
    .min(4, "The company's name must have at least 4 characters"),
  country: Yup.string().required(),
  state: Yup.string().required(),
  city: Yup.string().required(),
  code: Yup.string().required(),
  address: Yup.string()
    .required()
    .min(8, "The addres field must have at leats 8 characters"),
  email: Yup.string().email(),
  phone: Yup.string(),
  facebook: Yup.string(),
  website: Yup.string(),
});

const Header = styled.div`
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}%;
  border-radius: ${(porps) => porps.radius && 12}px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color && props.color};
  font-family: ${(props) => props.fontFamily && props.fontFamily};
  font-size: ${(props) => (props.fontSize ? props.fontSize : 1)}rem;
  padding: ${(props) => (props.padding ? props.padding : 0.6)}rem;
  margin: ${(props) => (props.margin ? props.margin : 0.8)}rem;

  ${(props) =>
    props.center &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const ADD_SELLER_MUTATION = gql`
  mutation addSeller(
    $userId: ID!
    $companyName: String!
    $companyImage: String!
    $location: InputLocation!
    $description: String!
    $images: [String!]
    $contacts: InputContact
  ) {
    addSeller(
      userId: $userId
      companyName: $companyName
      companyImage: $companyImage
      location: $location
      description: $description
      images: $images
      contacts: $contacts
    ) {
      companyName
      companyImage
      description
      location {
        address
        city
      }
      sellerId
      userId
    }
  }
`;

const SellerLogin = (props) => {
  const [nexStep, setNexStep] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [descriptionData, setDescriptionData] = useState("");
  const [userId, setUserId] = useState("");
  const [socials, setSocials] = useState(false);
  const [imageCount, setImageCount] = useState(0);

  const [images, setImages] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const [addSeller, { loading }] = useMutation(ADD_SELLER_MUTATION, {
    onCompleted: (data) => console.log(data),
    // onError: (err) => setError(err.graphQLErrors[0]),
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

  const imageHanlder = (e, round) => {
    let selected = e.target.files[0];

    console.log(selected);

    if (selected && types.includes(selected.type)) {
      setImageFile(selected);
      setError("");
      console.log("hereeeee");
    } else {
      setImageFile(selected);
      setError("Please select an image file (png or jpg)");
    }
  };

  return (
    <Divcenter>
      {!nexStep ? (
        <DivDouble
          border={true}
          height={450}
          width={940}
          borderRadius={12}
          margin={1}
        >
          <div>
            <RegisterForm
              history={props.history}
              initialSingUpValues={initialSingUpValues}
              registerSchema={registerSchema}
              setIsLogin={setNexStep}
              setUserData={setUserId}
            />
          </div>
          <div style={{ backgroundColor: "rgba(0,0,0,.9)" }}>
            <Divcenter style={{ width: "65%", margin: "auto" }}>
              <CustomH2 style={{ textAlign: "center" }}>
                {!nexStep
                  ? "First, register with a user account"
                  : "Now, register your company account"}
              </CustomH2>
            </Divcenter>
          </div>
        </DivDouble>
      ) : (
        <Divcenter flexDirection="column">
          <Header
            backgroundColor={"rgba(0,0,0,.9)"}
            radius={true}
            width={55}
            center={true}
          >
            <CustomH2 style={{ margin: "0" }}>
              Now, register your company data
            </CustomH2>
          </Header>
          <DivDouble
            first={100}
            second={0}
            border={true}
            height={100}
            width={75}
            percentaje={true}
            borderRadius={12}
            margin={1}
          >
            {/* <Title size={2} color={colors.mainOrange}>
          Add A New Category
        </Title> */}
            <DivContainer shadow={true} height={100} width={100}>
              <Formik
                initialValues={{
                  companyName: "",
                  country: "",
                  state: "",
                  city: "",
                  code: "",
                  address: "",
                  email: "",
                  phone: "",
                  facebook: "",
                  website: "",
                }}
                validateOnBlur={true}
                validationSchema={SellerSchema}
                onSubmit={async (values, actions) => {
                  await addSeller({
                    variables: {
                      userId: userId,
                      companyName: values.companyName,
                      companyImage: fileUrl,
                      location: {
                        country: values.country,
                        state: values.state,
                        city: values.city,
                        address: values.address,
                        code: values.code,
                      },
                      description: descriptionData,
                      images:
                        Object.entries(images).length !== 0 &&
                        Object.values(images),
                      concats: {
                        email: values.email && values.email,
                        phone: values.phone && values.phone,
                        facebook: values.facebook && values.facebook,
                        website: values.website && values.website,
                        tweeter: values.tweeter && values.tweeter,
                      },
                    },
                  });
                  actions.resetForm();
                  props.history.push("/login");
                }}
              >
                {(formikProps) => (
                  <Form autoComplete="Off" onSubmit={formikProps.handleSubmit}>
                    <DivColumn center={true}>
                      <MyTextInput
                        label="Company Name :"
                        name="companyName"
                        type="text"
                        height={34}
                        width={95}
                        placeholder="Begin tiping here..."
                        font={1.4}
                        error={
                          formikProps.errors.companyName &&
                          formikProps.touched.companyName
                            ? true
                            : false
                        }
                      />
                      <br />
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <LabelForm font={1.4}>
                          Select an image for the company profile
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
                            maxHeight={400}
                            maxWidth={800}
                          />
                        )}
                      </Divcenter>
                      {!fileUrl && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                      <LabelForm font={1.4}>Location Info</LabelForm>
                      <DivField>
                        <MyTextInput
                          label="Cuntry :"
                          name="country"
                          type="text"
                          height={30}
                          width={25}
                          font={1}
                          error={
                            formikProps.errors.companyName &&
                            formikProps.touched.companyName
                              ? true
                              : false
                          }
                        />
                        <MyTextInput
                          label="State :"
                          name="state"
                          type="text"
                          height={30}
                          width={25}
                          font={1}
                          error={
                            formikProps.errors.state &&
                            formikProps.touched.state
                              ? true
                              : false
                          }
                        />
                        <MyTextInput
                          label="City :"
                          name="city"
                          type="text"
                          height={30}
                          width={25}
                          font={1}
                          error={
                            formikProps.errors.city && formikProps.touched.city
                              ? true
                              : false
                          }
                        />
                      </DivField>
                      <DivField
                        style={{
                          justifyContent: "space-around",
                          height: "auto",
                        }}
                      >
                        <MyTextInput
                          label="Address :"
                          name="address"
                          type="text"
                          height={30}
                          width={32}
                          font={1}
                          error={
                            formikProps.errors.address &&
                            formikProps.touched.address
                              ? true
                              : false
                          }
                        />
                        <MyTextInput
                          label="Postal Code :"
                          name="code"
                          type="text"
                          height={30}
                          width={25}
                          font={1}
                          error={
                            formikProps.errors.code && formikProps.touched.code
                              ? true
                              : false
                          }
                        />
                      </DivField>
                      <br />
                      <LabelForm font={1.4}>Add a description</LabelForm>
                      <AdminCKEditor
                        setData={setDescriptionData}
                        dataEditor={descriptionData}
                        placeholder="Begin tiping a description here ..."
                      />
                      <br />
                      <TransparentButton
                        color="green"
                        type="button"
                        width={260}
                        onClick={() => setSocials((prevState) => !prevState)}
                      >
                        <Icon color="green" icon_name="fas fa-plus" />
                        Add social links ?
                      </TransparentButton>

                      {socials && (
                        <>
                          <DivDouble>
                            <div>
                              <DivColumn>
                                <MyTextInput
                                  label="Facebook :"
                                  name="facebook"
                                  type="text"
                                  height={30}
                                  width={85}
                                  font={1}
                                  error={
                                    formikProps.errors.facebook &&
                                    formikProps.touched.facebook
                                      ? true
                                      : false
                                  }
                                />
                              </DivColumn>

                              <DivColumn>
                                <MyTextInput
                                  label="Website :"
                                  name="website"
                                  type="text"
                                  height={30}
                                  width={85}
                                  font={1}
                                  error={
                                    formikProps.errors.website &&
                                    formikProps.touched.website
                                      ? true
                                      : false
                                  }
                                />
                              </DivColumn>
                            </div>
                            <div>
                              <DivColumn>
                                <MyTextInput
                                  label="Email :"
                                  name="email"
                                  type="email"
                                  height={30}
                                  width={85}
                                  font={1}
                                  error={
                                    formikProps.errors.email &&
                                    formikProps.touched.email
                                      ? true
                                      : false
                                  }
                                />
                              </DivColumn>

                              <DivColumn>
                                <MyTextInput
                                  label="Phone :"
                                  name="phone"
                                  type="phone"
                                  height={30}
                                  width={85}
                                  font={1}
                                  error={
                                    formikProps.errors.phone &&
                                    formikProps.touched.phone
                                      ? true
                                      : false
                                  }
                                />
                              </DivColumn>
                            </div>
                          </DivDouble>
                        </>
                      )}

                      <TransparentButton
                        color="green"
                        type="button"
                        width={320}
                        onClick={() =>
                          setImageCount((prevState) => prevState + 1)
                        }
                      >
                        <Icon color="green" icon_name="fas fa-plus" />
                        Add images for the comapny's profile
                      </TransparentButton>

                      {imageCount > 0 &&
                        Array(imageCount)
                          .fill()
                          .map((x, index) => (
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
                                  <Icon icon_name="fas fa-camera-retro" />{" "}
                                  Upload
                                </UploadFileLabel>
                              </div>
                              {error && (
                                <SpanError className="error">{error}</SpanError>
                              )}
                              {imageFile && (
                                <ProgressBar
                                  file={imageFile}
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
          </DivDouble>
        </Divcenter>
      )}
    </Divcenter>
  );
};

export default SellerLogin;
