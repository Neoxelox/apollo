import styles from "../styles/Home.module.scss";
import { useTheme } from "next-themes";
import Switch from "../components/atoms/Switch";
import { useEffect, useState } from "react";

export default function Home() {
    const { theme, setTheme } = useTheme();

    /* We need to know when the component is mounted
       If it is not mounted useTheme hook is undefined*/
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div className={`${styles.container}`}>
            <h1 className="text-purple-400 dark:text-purple-300">APOLLO</h1>
            <Switch
                value={theme === "light"}
                onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            />
        </div>
    );
}
