import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import { categoryStatus } from "../../utils/constants";

import DashboardHeading from "../dashboard/DashboardHeading";
import * as Yup from "yup";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../firebase/firebase-config";
import slugify from "slugify";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object({
  name: Yup.string().required("Please enter your name"),
});
const CategoryAddnew = () => {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
    resolver: yupResolver(schema),
  });
  const { state } = useLocation();
  const navigate = useNavigate();
  const watchStatus = watch("status");

  useEffect(() => {
    if (state.action === "edit") {
      async function fetchData() {
        const colRef = doc(database, "categories", state.id);
        const singleDoc = await getDoc(colRef);
        reset(singleDoc.data());
      }
      fetchData();
    }
  }, [state.action, reset, state.id]);

  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0].message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);
  const handleCategory = async (values) => {
    if (state.action === "add") {
      if (!isValid) return;
      const newValues = { ...values };
      newValues.status = Number(values.status);
      newValues.slug = slugify(values.slug || values.name, { lower: true });
      try {
        const colRef = collection(database, "categories");
        await addDoc(colRef, {
          ...newValues,
          createdAt: serverTimestamp(),
        });
        toast.success("You create category successfully");
        navigate("/manage/category");
      } catch (error) {
        toast.error(error);
      }
    } else {
      if (!isValid) return;
      const oldValues = { ...values };
      oldValues.status = Number(values.status);
      oldValues.slug = slugify(values.slug || values.name, { lower: true });
      try {
        const docRef = doc(database, "categories", state.id);
        await updateDoc(docRef, {
          ...oldValues,
        });
        toast.success("You create category successfully");
        navigate("/manage/category");
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div>
      <DashboardHeading
        title={state.action === "edit" ? "Update category" : "Add new category"}
        desc={
          state.action === "edit"
            ? `Update category id: ${state.id}`
            : "Add new category"
        }
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCategory)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              name="name"
              control={control}
              placeholder="Enter your name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              name="slug"
              control={control}
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              ></Radio>
              <Label>Approved</Label>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              ></Radio>
              <Label>Unapproved</Label>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {state.action === "edit" ? "Update category" : "Add new category"}
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddnew;
