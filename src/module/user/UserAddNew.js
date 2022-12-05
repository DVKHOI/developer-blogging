import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import Input from "../../components/input/Input";
import ToggleInputPassword from "../../components/input/ToggleInputPassword";
import Label from "../../components/label/Label";
import { userRole, userStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import slugify from "slugify";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, database } from "../../firebase/firebase-config";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import UploadImage from "../../components/uploadImage/UploadImage";

const schema = Yup.object({
  fullname: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Please valid email")
    .required("Please enter your email address"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});
const UserAddNew = () => {
  const { state } = useLocation();
  const userId = state.id;
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      status: 1,
      role: 3,
    },
    resolver: yupResolver(schema),
  });
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const {
    image,
    setImage,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues, imageName, deleteAvatar);

  async function deleteAvatar() {
    const colRef = doc(database, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message);
    }
  }, [errors]);
  useEffect(() => {
    if (state.action === "edit") {
      async function fetchData() {
        if (!userId) return;
        const docRef = doc(database, "users", userId);
        const docData = await getDoc(docRef);

        reset(docData && docData.data());
      }
      fetchData();
    }
  }, [userId, reset, state.action]);
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const handleSubmitFrom = async (values) => {
    if (!isValid) return;
    try {
      if (state.action === "add") {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        await addDoc(collection(database, "users"), {
          fullname: values.fullname,
          email: values.email,
          password: values.password,
          username: slugify(values.username || values.fullname, {
            lower: true,
          }),
          avatar: image,
          status: Number(values.status),
          role: Number(values.role),
          createdAt: serverTimestamp(),
        });
      } else if (state.action === "edit") {
        const docRef = doc(database, "users", state.id);
        await updateDoc(docRef, {
          fullname: values.fullname,
          email: values.email,
          password: values.password,
          username: slugify(values.username || values.fullname, {
            lower: true,
          }),
          avatar: image,
          status: Number(values.status),
          role: Number(values.role),
        });
      }
      toast.success(
        state.action === "add"
          ? `Create user ${values.fullname} successfully`
          : `Update user ${values.fullname} successfully`
      );
      reset({
        fullname: "",
        username: "",
        email: "",
        password: "",
        status: 1,
        role: 3,
      });
      handleResetUpload();
    } catch (error) {
      console.log("🚀  error", error);
    }
  };
  return (
    <Fragment>
      <DashboardHeading
        title={state.action === "edit" ? "Update user" : "Add new user"}
        desc={
          state.action === "edit"
            ? `Update user id: ${state.id}`
            : "Add new user"
        }
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleSubmitFrom)}>
        <div className="w-[200px] h-[200px] mx-auto mb-10 rounded-full">
          <UploadImage
            onChange={handleSelectImage}
            className="!rounded-full h-full"
            progress={progress}
            image={image}
            handleDeleteImage={handleDeleteImage}
          ></UploadImage>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>UserName</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email address</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <ToggleInputPassword control={control}></ToggleInputPassword>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={Number(userStatus.ACTIVE)}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={Number(userStatus.PENDING)}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={Number(userStatus.BAN)}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={Number(userRole.ADMIN)}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={Number(userRole.MOD)}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={Number(userRole.USER)}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {state.action === "edit" ? "Update User" : "Add new user"}
        </Button>
      </form>
    </Fragment>
  );
};

export default UserAddNew;
