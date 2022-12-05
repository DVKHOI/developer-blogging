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
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { Button } from "../../components/button";
import { LabelStatus } from "../../components/label";
import { Table } from "../../components/table";
import { useAuth } from "../../context/auth-context";
import { database } from "../../firebase/firebase-config";
import { postStatus, userRole } from "../../utils/constants";

const POST_PER_PAGE = 3;
const PostManage = () => {
  const [listPosts, setListPost] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(database, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
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
        setListPost(result);
      });
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
    }
    fetchData();
    document.title = "Post Manage";
  }, [filter]);
  const handleLoadmorePost = async () => {
    const nextRef = query(
      collection(database, "posts"),
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
      setListPost([...listPosts, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  const renderStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case postStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case postStatus.REJECTED:
        return <LabelStatus type="danger">Rejected</LabelStatus>;

      default:
        break;
    }
  };
  const handleDeletePost = (post) => {
    const docRef = doc(database, "posts", post.id);
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
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  };
  const { userInfo } = useAuth();
  return (
    <div>
      <h1 className="dashboard-heading">Manage post</h1>
      <div className="flex justify-end mb-10">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listPosts.length > 0 &&
            listPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.id?.slice(0, 5) + "..."}</td>
                <td className="!pr-[50px]">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={post.image}
                      alt=""
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <time className="text-sm text-gray-500">
                        Date:
                        {new Date(
                          post.createdAt?.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500">{post.category?.name}</span>
                </td>
                <td>
                  <span className="text-gray-500">{post.user?.username}</span>
                </td>
                <td>{renderStatus(post.status)}</td>
                <td>
                  <div className="flex items-center text-gray-500 gap-x-3">
                    <ActionView
                      onClick={() => navigate(`/${post.slug}`)}
                    ></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate("/manage/update-post", {
                          state: { id: post.id },
                        })
                      }
                    ></ActionEdit>

                    {userInfo.role === userRole.ADMIN && (
                      <ActionDelete
                        onClick={() => handleDeletePost(post)}
                      ></ActionDelete>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* <Pagination></Pagination> */}
      {total > listPosts.length && (
        <div className="mt-10">
          <Button onClick={handleLoadmorePost} className="mx-auto">
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostManage;
