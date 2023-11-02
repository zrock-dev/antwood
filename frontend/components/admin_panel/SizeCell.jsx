import formStyle from "./size_cell.module.css";
function SizeCell() {
  return (
    <div className={formStyle.shoe_configure_size_ctn}>
      <div className={formStyle.shoe_configure_size}></div>
      <div className={formStyle.shoe_configure_size}></div>
      <div className={formStyle.shoe_configure_size}></div>
      <div className={formStyle.shoe_configure_size}></div>
      <div className={formStyle.shoe_configure_size}></div>
      <div className={formStyle.shoe_configure_size}></div>
    </div>
  );
}

export default SizeCell;
