import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { Radio } from "../../components/checkbox";
import { Dropdown } from "../../components/dropdown";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import Toggle from "../../components/toggle/Toggle";
import UploadImage from "../../components/uploadImage";
import { database } from "../../firebase/firebase-config";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { postStatus, userRole } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import { useAuth } from "../../context/auth-context";
import Swal from "sweetalert2";
import Textarea from "../../components/textarea/Textarea";
import slugify from "slugify";
Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
  const { userInfo } = useAuth();
  const { state } = useLocation();
  const postId = state.id;
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  // get data from update
  useEffect(() => {
    async function fetchData() {
      if (!postId) return;
      const docRef = doc(database, "posts", postId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        reset(docSnapshot.data());
        setContent(docSnapshot.data()?.content || "");
        setSelectCategory(docSnapshot.data()?.category || "");
      }
    }
    fetchData();
  }, [postId, reset]);
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const {
    image,
    progress,
    setImage,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  } = useFirebaseImage(setValue, getValues, imageName, deleteImage);
  // callback deleteImage
  async function deleteImage() {
    if (userInfo?.role !== userRole.ADMIN) {
      Swal.fire("Failed", "You have no right to do this action", "warning");
      return;
    }
    const docRef = doc(database, "posts", postId);
    await updateDoc(docRef, {
      image: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [setImage, imageUrl]);

  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");

  // get data category
  useEffect(() => {
    async function getData() {
      const colRef = collection(database, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setCategories(result);
    }
    getData();
  }, []);
  // select category name
  const handleSelectCategory = async (item) => {
    const colRef = doc(database, "categories", item.id);
    const docData = await getDoc(colRef);

    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });

    setSelectCategory(item);
  };
  // document title
  useEffect(() => {
    document.title = "Developer Blogging - Update post ";
  }, []);

  const handleUpdatePost = async (values) => {
    if (!isValid) return null;
    const cloneValues = { ...values };
    cloneValues.status = Number(values.status);
    cloneValues.slug = slugify(values.slug || values.title, { lower: true });
    try {
      const docRef = doc(database, "posts", postId);
      await updateDoc(docRef, {
        ...cloneValues,
        categoryId: cloneValues.category.id,
        content: content,
        image,
      });
      handleResetUpload();
      toast.success("Update user successfully");
    } catch (error) {
      console.log(error);
      toast.error("Can not update user");
    }
    handleResetUpload();
    reset({
      title: "",
      slug: "",
      status: 2,
      category: {},
      hot: false,
      image: "",
      user: {},
      desc: "",
    });
    setContent({});
    setSelectCategory({});
    navigate("/manage/post");
  };
  // add field modules (update content with upload image)
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFromData = new FormData();
          bodyFromData.append("image", file);
          const response = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=4bb6d43216f3a1e39a2b5d82fa69eeb1",
            data: bodyFromData,
            headers: {
              "Content-Type": "mutipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  if (!postId) return null;
  return (
    <>
      <DashboardHeading
        title="Update post"
        desc={`Your update post id: ${postId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
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
        <div className="my-10">
          <Label>Content</Label>
          <div className="w-full entry-content">
            <ReactQuill
              modules={modules}
              theme="snow"
              value={content}
              onChange={setContent}
            />
          </div>
        </div>
        {(userInfo?.role === userRole.ADMIN ||
          userInfo?.role === userRole.MOD) && (
          <div className="form-layout">
            <Field>
              <Label>Feature Hot</Label>
              <Toggle
                on={watchHot === true}
                onClick={() => setValue("hot", !watchHot)}
              ></Toggle>
            </Field>

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
          </div>
        )}
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update post
        </Button>
      </form>
    </>
  );
};

export default PostUpdate;
