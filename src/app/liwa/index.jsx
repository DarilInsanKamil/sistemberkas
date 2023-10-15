"use client";

import styles from "./rafly.module.css";
export const TableBody = ({ data, idx }) => {
  return (
    <tbody key={idx} className={styles.tbody}>
      <tr className={styles.tr}>
        <td className={styles.item}>{data.Nama}</td>
        <td className={styles.item}>{data.NIM}</td>
        <td className={styles.item}>{data.Kelas}</td>
        <td className={styles.item}>{data.Alamat}</td>
      </tr>
    </tbody>
  );
};

export const ModalUpload = ({
  inputData,
  handleChange,
  handleSubmit,
  handleModal,
}) => {
  return (
    <div className={styles.form_container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>Form</h3>
        <div className={styles.input_container}>
          <label className={styles.label}>Nama</label>
          <input
            name="Nama"
            type="name"
            value={inputData.Nama}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>NIM</label>
          <input
            name="NIM"
            type="number"
            value={inputData.NIM}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>Kelas</label>
          <input
            name="Kelas"
            type="text"
            value={inputData.Kelas}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>Alamat</label>
          <input
            name="Alamat"
            type="text"
            value={inputData.Alamat}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.btn_container}>
          <button className={styles.btn_submit}>Submit</button>
          <button className={styles.btn_close} onClick={handleModal}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
export const Loader = () => {
  return <div className={styles.loader}></div>
}