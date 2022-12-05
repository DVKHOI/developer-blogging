import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import Button from "../../components/button/Button";
import LabelStatus from "../../components/label/LabelStatus";
import Table from "../../components/table/Table";
import { database } from "../../firebase/firebase-config";
import { categoryStatus, userRole } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import Swal from "sweetalert2";
import { useAuth } from "../../context/auth-context";
import Dashboard404 from "../dashboard/Dashboard404";

const ManageCategoryStyles = styled.div``;
const POST_PER_PAGE = 3;
const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState("");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(database, "categories");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastVisible);

      onSnapshot(newRef, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategories(result);
      });
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      document.title = "Category Manage";
    }
    fetchData();
  }, [filter]);
  if (userInfo.role !== userRole.ADMIN) return <Dashboard404></Dashboard404>;
  const handleDeleteCategory = async (catrgoryId) => {
    const docRef = doc(database, "categories", catrgoryId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(database, "categories"),
      startAfter(lastDoc),
      limit(POST_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories([...categories, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  if (!categories) return;
  return (
    <ManageCategoryStyles>
      <DashboardHeading title="Category" desc="Manage Category">
        <Button
          kind="secondary"
          height="56px"
          onClick={() =>
            navigate("/manage/add-category", { state: { action: "add" } })
          }
        >
          Create Category
        </Button>
      </DashboardHeading>
      <div className="flex items-center justify-end mb-5 mr-5 search">
        <input
          type="text"
          className="p-3 border border-gray-200 rounded-lg "
          placeholder="Search"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td className="text-gray-400">{category.slug}</td>
                <td>
                  {category.status === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {category.status === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="danger">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate("/manage/add-category", {
                          state: { id: category.id, action: "edit" },
                        })
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > categories.length && (
        <div className="mt-10">
          <Button onClick={handleLoadMoreCategory} className="mx-auto">
            Load more
          </Button>
        </div>
      )}
    </ManageCategoryStyles>
  );
};

export default CategoryManage;
