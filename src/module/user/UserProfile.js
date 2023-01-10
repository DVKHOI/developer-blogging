import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import UploadImage from "../../components/uploadImage";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useLocation } from "react-router-dom";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase/firebase-config";
import { useEffect } from "react";
import { useState } from "react";
import ToggleInputPassword from "../../components/input/ToggleInputPassword";
import slugify from "slugify";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

const schema = Yup.object({
  fullname: Yup.string().required("Please enter your name"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});
const UserProfile = () => {
  const { state } = useLocation();
  const email = state.email;
  const [user, setuser] = useState([]);
  const listUsers = useSelector((state) => state.usersRedux.users);
  const userObj = user[0];
  const userId = userObj?.id;

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      birthday: "",
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message);
    }
  }, [errors]);
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
    async function fetchData() {
      const result = listUsers.filter((user) => user.email === email);
      setuser(result);
    }
    fetchData();
  }, [email, listUsers]);
  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      const docRef = doc(database, "users", userId);
      const docSnap = await getDoc(docRef);
      reset(docSnap && docSnap.data());
    }
    fetchData();
  }, [userId, reset]);
  const handleSubmitFrom = async (values) => {
    if (!isValid) return;
    const docRef = doc(database, "users", userId);
    await updateDoc(docRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      username: slugify(values.username || values.fullname, {
        lower: true,
      }),
      avatar: image,
    });
    toast.success(`Update user ${values.fullname} successfully`);
    reset({
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    handleResetUpload();
  };
  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc={`Update your account information. Id : ${userId}`}
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
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
              type="date"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Password</Label>
            <ToggleInputPassword control={control}></ToggleInputPassword>
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
            ></Input>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[200px]"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
