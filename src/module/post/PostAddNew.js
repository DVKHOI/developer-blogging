import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "../../components/button";
import { Radio } from "../../components/checkbox";
import { Dropdown } from "../../components/dropdown";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import slugify from "slugify";
import { postStatus, userRole } from "../../utils/constants";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import UploadImage from "../../components/uploadImage";
import Toggle from "../../components/toggle/Toggle";
import { useEffect } from "react";
import { database } from "../../firebase/firebase-config";
import { useAuth } from "../../context/auth-context";
import { toast } from "react-toastify";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { useNavigate } from "react-router-dom";
import Textarea from "../../components/textarea/Textarea";
import { useSelector } from "react-redux";

const PostAddNewStyles = styled.div``;
const PostAddNew = () => {
  const navigate = useNavigate();
  const { control, watch, handleSubmit, setValue, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: {},
      hot: false,
      image: "",
      user: {},
    },
  });
  const {
    progress,
    image,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAuth();
  const listCategories = useSelector((state) => state.categoryRedux.categories);

  const watchStatus = watch("status");
  const watchHot = watch("hot");
  useEffect(() => {
    async function fetchDataUser() {
      if (!userInfo.email) return null;
      const q = query(
        collection(database, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email]);
  const addPostHandle = async (values) => {
    console.log("🚀 ~ file: PostAddNew.js:82 ~ addPostHandle ~ values", values);
    try {
      setLoading(true);
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);

      const colRef = collection(database, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        userId: cloneValues.user.id,
        categoryId: cloneValues.category.id,
        image,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new post successfully!!!");
      reset({
        title: "",
        slug: "",
        status: 2,
        category: {},
        hot: false,
        image: "",
        user: {},
      });
      handleResetUpload();
      setSelectCategory({});
      navigate("/manage/post");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function getData() {
      const results = listCategories.filter(
        (category) => category.status === 1
      );

      setCategories(results);
    }
    getData();
  }, [listCategories]);
  const handleSelectCategory = async (item) => {
    const result = categories.filter((category) => category.name === item.name);
    setValue("category", result[0]);
    setSelectCategory(item);
  };
  useEffect(() => {
    document.title = "Developer way - Add new post ";
  }, []);
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandle)}>
        <div className="grid mb-5 sm:grid-cols-1 lg:grid-cols-1 lg:gap-x-10 lg:mb-10">
          <Field>
            <Label>Image</Label>
            <UploadImage
              onChange={handleSelectImage}
              className=" h-[400px]"
              progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
            ></UploadImage>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Title</Label>
            <Input
              name="title"
              control={control}
              placeholder="Enter your title"
            ></Input>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={`${selectCategory?.name || "Select at Categoris"}`}
              ></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleSelectCategory(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </Field>
        </div>
        <div className="w-full my-10">
          <Field>
            <Label>Description</Label>
            <Textarea
              name="desc"
              control={control}
              placeholder="Enter your description"
              className="h-[100px]"
            ></Textarea>
          </Field>
        </div>
        <div className="form-layout">
          {(userInfo?.role === userRole.ADMIN ||
            userInfo?.role === userRole.MOD) && (
            <Field>
              <Label>Feature Hot</Label>
              <Toggle
                on={watchHot === true}
                onClick={() => setValue("hot", !watchHot)}
              ></Toggle>
            </Field>
          )}
          {(userInfo?.role === userRole.ADMIN ||
            userInfo?.role === userRole.MOD) && (
            <Field>
              <Label>Status</Label>
              <div className="flex items-center gap-x-5">
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === postStatus.APPROVED}
                  value={postStatus.APPROVED}
                >
                  Approved
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === postStatus.PENDING}
                  value={postStatus.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === postStatus.REJECTED}
                  value={postStatus.REJECTED}
                >
                  Reject
                </Radio>
              </div>
            </Field>
          )}
        </div>

        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={loading}
          disabled={loading}
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;

/**
 *  <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Title</Label>
            <Input
              name="title"
              control={control}
              placeholder="Enter your title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
 */
