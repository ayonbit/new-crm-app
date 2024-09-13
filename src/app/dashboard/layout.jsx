//Dependencies
import styles from "@/components/dashboard/dashboard.module.css";
import Navbar from "@/components/dashboard/navbar/navbar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.navcontent}>
        <Navbar />
      </div>
      <div className={styles.main_content}>
        <div className={styles.menu}>
          <Sidebar />
        </div>
        <div className={styles.childcontent}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
