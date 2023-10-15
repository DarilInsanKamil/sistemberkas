"use client";
import { Suspense, useEffect, useState } from "react";
import { Loader, ModalUpload, TableBody } from ".";
import Swal from "sweetalert2";
import styles from "./rafly.module.css";

const Page = () => {
  const [data, setData] = useState([]);
  const [isDataChange, setIsDataChange] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 5; // Number of items per page
  const [inputData, setInputData] = useState({
    Nama: "",
    NIM: "",
    Kelas: "",
    Alamat: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://library-db-2ace9-default-rtdb.firebaseio.com/mahasiswa.json",
          { cache: "no-store" }
        );
        let resdata = await res.json();
        const datas = Object.values(resdata);
        const keys = Object.keys(resdata);
        setData({
          id: keys,
          datas,
        });
      } catch (err) {
        console.log(`fetch failed: ${err}`);
      }
    };
    getData();
  }, [isDataChange, setIsDataChange]);

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e) => {
    setIsDataChange(false);
    e.preventDefault();
    try {
      let newData = {
        Nama: inputData.Nama,
        NIM: inputData.NIM,
        Kelas: inputData.Kelas,
        Alamat: inputData.Alamat,
      };
      const res = fetch(
        "https://library-db-2ace9-default-rtdb.firebaseio.com/mahasiswa.json",
        {
          method: "POST",
          body: JSON.stringify(newData),
        }
      );
      alert();
      setTimeout(() => {
        setIsDataChange(true);
      }, 2000);
      setShowModal(false);
      setInputData({
        Nama: "",
        NIM: "",
        Kelas: "",
        Alamat: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const alert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Data Pushed Succesful",
    });
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  //   const handleDelete = (id) => {
  //     setIsDataChange(false);
  //     fetch(
  //       `https://library-db-2ace9-default-rtdb.firebaseio.com/mahasiswa/${id}.json`,
  //       {
  //         method: "DELETE",
  //       }
  //     )
  //       .then((response) => {
  //         if (response.ok) {
  //           console.log("Data with ID " + id + " deleted successfully");
  //         } else {
  //           console.error("Error deleting data with ID " + id);
  //         }
  //         setIsDataChange(true);
  //       })
  //       .catch((error) => {
  //         console.error("Error deleting data:", error);
  //       });
  //   };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (data.datas && data.datas.length > 0) {
      return data.datas.slice(startIndex, endIndex);
    }
    return [];
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className={styles.table_container}>
      <div className={styles.sub_container_table}>
        <div style={{ textAlign: "center" }}>
          <h1>Sistem Berkas</h1>
          <p>Daril Insan Kamil</p>
        </div>
        <button className={styles.btn_submit} onClick={handleModal}>
          Tambah Data
        </button>
        {showModal ? (
          <ModalUpload
            inputData={inputData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleModal={handleModal}
          />
        ) : null}
        <div className={styles.section_table}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr_thead}>
              <th className={styles.item_head}>Nama</th>
              <th className={styles.item_head}>NIM</th>
              <th className={styles.item_head}>Kelas</th>
              <th className={styles.item_head}>Alamat</th>
            </tr>
          </thead>
          {getCurrentPageData().map((res, idx) => {
            return (
              <Suspense fallback={<Loader />} key={idx}>
                <TableBody data={res} />
              </Suspense>
            );
          })}
        </table>
        </div>
        <div className={styles.pagination}>
          <button
            className={styles.btn_close}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            previous
          </button>
          <button
            className={styles.btn_submit}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              data.datas && data.datas.length <= currentPage * itemsPerPage
            }
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
