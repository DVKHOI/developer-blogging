import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { LabelStatus } from "../../components/label";
import Paginations from "../../components/pagination/Pagination";
import { Table } from "../../components/table";
import { useAuth } from "../../context/auth-context";
import { database } from "../../firebase/firebase-config";
import useDebounce from "../../hooks/useDebounce";
import { postStatus, userRole } from "../../utils/constants";

const PostManage = () => {
  const [listPosts, setListPost] = useState([]);
  console.log(
    "🚀 ~ file: PostManage.js:24 ~ PostManage ~ listPosts",
    listPosts
  );

  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  const handleSearch = (e) => {
    setFilter(e.target.value);
  };
  const filterDebounce = useDebounce(filter, 500);

  useEffect(() => {
    async function fetchData() {
      if (userInfo.role === userRole.USER) {
        const queries = query(
          collection(database, "posts"),
          where("user.email", "==", userInfo.email)
        );
        onSnapshot(queries, (snapshot) => {
          let results = [];
          snapshot.forEach((doc) => {
            results.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setListPost(results);
        });
      } else {
        const colRef = collection(database, "posts");

        onSnapshot(colRef, (snapshot) => {
          let result = [];
          snapshot.forEach((doc) => {
            result.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setListPost(result);
        });
      }
    }
    fetchData();
    document.title = "Post Manage";
  }, [userInfo.email, userInfo.role]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (filterDebounce) {
      const result = listPosts.filter((post) =>
        post.title.toLowerCase().includes(filterDebounce.trim().toLowerCase())
      );
      setPosts(result);
    } else {
      setPosts(listPosts);
    }
  }, [filterDebounce, listPosts]);
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

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  let NUM_OF_RECORDS = posts.length;
  let LIMIT = 5;

  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData = posts.slice(
    (currentPage - 1) * LIMIT,
    (currentPage - 1) * LIMIT + LIMIT
  );
  return (
    <div>
      <h1 className="dashboard-heading">Manage post</h1>
      <div className="flex justify-end mb-10">
        <div className="w-full max-w-[200px]">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
            onChange={handleSearch}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th className="!font-semibold">Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 &&
            currentData.map((post) => (
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
                  <span className="text-gray-500">{post.user?.fullname}</span>
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
                    <ActionDelete
                      onClick={() => handleDeletePost(post)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {listPosts.length > LIMIT && (
        <div className="pagination-wrapper">
          <Paginations
            totalRecords={NUM_OF_RECORDS}
            pageLimit={LIMIT}
            onPageChanged={onPageChanged}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default PostManage;
