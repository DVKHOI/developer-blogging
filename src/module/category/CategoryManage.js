import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import Button from "../../components/button/Button";
import LabelStatus from "../../components/label/LabelStatus";
import Table from "../../components/table/Table";
import { database } from "../../firebase/firebase-config";
import { categoryStatus, userRole } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import Swal from "sweetalert2";
import { useAuth } from "../../context/auth-context";
import Dashboard404 from "../dashboard/Dashboard404";
import Paginations from "../../components/pagination/Pagination";
import useDebounce from "../../hooks/useDebounce";

const ManageCategoryStyles = styled.div``;
const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const [listCategory, setListCategory] = useState([]);

  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const filterDebounce = useDebounce(filter, 500);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(database, "categories");

      onSnapshot(colRef, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategories(result);
      });

      document.title = "Category Manage";
    }
    fetchData();
  }, [filter]);
  useEffect(() => {
    if (filterDebounce) {
      const result = categories.filter((category) =>
        category.name
          .toLowerCase()
          .includes(filterDebounce.trim().toLowerCase())
      );
      setListCategory(result);
    } else {
      setListCategory(categories);
    }
  }, [filterDebounce, categories]);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  let NUM_OF_RECORDS = listCategory.length;
  let LIMIT = 3;

  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData = listCategory.slice(
    (currentPage - 1) * LIMIT,
    (currentPage - 1) * LIMIT + LIMIT
  );
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
          {currentData.length > 0 &&
            currentData.map((category) => (
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
      {categories.length > LIMIT && (
        <div className="pagination-wrapper">
          <Paginations
            totalRecords={NUM_OF_RECORDS}
            pageLimit={LIMIT}
            onPageChanged={onPageChanged}
            currentPage={currentPage}
          />
        </div>
      )}
    </ManageCategoryStyles>
  );
};

export default CategoryManage;
