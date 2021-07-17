import styles from "../../styles/Switch.module.scss";

interface Props {
    value: boolean;
    onChange: () => void;
    className?: string;
    style?: any;
}

export default function Switch(props: Props) {
    const { value, onChange, className, style } = props;

    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                checked={value}
                onChange={() => onChange()}
            />
            <span
                className={styles.slider + " bg-purple-400 dark:bg-purple-300"}
            />
        </label>
    );
}
