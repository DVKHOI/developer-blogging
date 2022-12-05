import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import Button from "../../components/button/Button";
import LabelStatus from "../../components/label/LabelStatus";
import Table from "../../components/table/Table";
import { useAuth } from "../../context/auth-context";
import { database } from "../../firebase/firebase-config";
import { userRole, userStatus } from "../../utils/constants";
import Dashboard404 from "../dashboard/Dashboard404";
import DashboardHeading from "../dashboard/DashboardHeading";

const POST_PER_PAGE = 3;
const UserManage = () => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const [listUsers, setListUsers] = useState([]);
  const [lastDoc, setLastDoc] = useState("");
  const [total, setTotal] = useState(0);
  const { userInfo } = useAuth();
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(database, "users");
      const newRef = filter
        ? query(
            colRef,
            where("fullname", ">=", filter),
            where("fullname", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastVisible);
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setListUsers(results);
      });
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
    }
    fetchData();
    document.title = "User Manage";
  }, [filter]);
  if (userInfo.role !== userRole.ADMIN) return <Dashboard404></Dashboard404>;
  const handleDeleteUser = async (userId) => {
    const docRef = doc(database, "users", userId);
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
      collection(database, "users"),
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
      setListUsers([...listUsers, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  const getRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return <LabelStatus type="default">Admin</LabelStatus>;
      case userRole.MOD:
        return <LabelStatus type="default">Mod</LabelStatus>;
      case userRole.USER:
        return <LabelStatus type="default">User</LabelStatus>;
      default:
        return null;
    }
  };
  const getStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">Banned</LabelStatus>;
      default:
        return null;
    }
  };
  return (
    <div>
      <DashboardHeading title="User" desc="Manage User">
        <Button
          kind="secondary"
          height="56px"
          onClick={() =>
            navigate("/manage/add-user", { state: { action: "add" } })
          }
        >
          Create User
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
            <th>Info</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers?.map((user) => (
            <tr key={user.id}>
              <td>{user.id.slice(0, 5) + "..."}</td>
              <td>
                <div className="flex gap-x-3 ">
                  <img
                    src={user?.avatar}
                    alt=""
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">{user?.fullname}</span>
                    <span className="text-sm text-gray-300">
                      {new Date(
                        user?.createdAt?.seconds * 1000
                      ).toLocaleDateString("vi-VI")}
                    </span>
                  </div>
                </div>
              </td>
              <td>{user?.username}</td>
              <td>{user?.email.slice(0, 5) + "..."}</td>
              <td>{getRole(user?.role)}</td>
              <td>{getStatus(user?.status)}</td>

              <td>
                <div className="flex items-center justify-start gap-x-3">
                  <ActionView></ActionView>
                  <ActionEdit
                    onClick={() =>
                      navigate("/manage/add-user", {
                        state: { id: user.id, action: "edit" },
                      })
                    }
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => handleDeleteUser(user.id)}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {total > listUsers.length && (
        <div className="mt-10">
          <Button onClick={handleLoadMoreCategory} className="mx-auto">
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserManage;
