import FormLogin from "@/ui/organisms/Form/auth/FormLogin";
import styles from "./LoginTemplate.module.scss"

export default function LoginTemplate() {
  return (
    <>
    <div className={styles.container}>
      <FormLogin />
    </div>
    </>
  );
}
