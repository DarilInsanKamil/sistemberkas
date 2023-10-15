"use client";
import { Suspense, useEffect, useState } from "react";
import { Loader, ModalUpload, TableBody } from ".";
import Swal from "sweetalert2";
import styles from "./rafly.module.css";

const Page = () => {
  const [data, setData] = useState([]);
  const [isDataChange, setIsDataChange] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
          "https://tugas-sistem-berkas-default-rtdb.firebaseio.com/.json",
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
        "https://tugas-sistem-berkas-default-rtdb.firebaseio.com/.json",
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

  return (
    <div className={styles.table_container}>
      <div className={styles.sub_container_table}>
        <div style={{ textAlign: "center" }}>
          <h1>Sistem Berkas</h1>
          <p>Suliwa Yudha adinata</p>
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
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.tr_thead}>
              <th className={styles.item_head}>Nama</th>
              <th className={styles.item_head}>NIM</th>
              <th className={styles.item_head}>Kelas</th>
              <th className={styles.item_head}>Alamat</th>
            </tr>
          </thead>
          {data.datas &&
            data.datas.map((res, idx) => {
              return (
                <Suspense fallback={<Loader />}>
                  <TableBody data={res} key={idx} />
                </Suspense>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default Page;
