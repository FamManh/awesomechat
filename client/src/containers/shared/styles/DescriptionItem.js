export const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: "22px",
            marginBottom: 7,
            color: "rgba(0,0,0,0.65)"
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: "inline-block",
                color: "rgba(0,0,0,0.85)"
            }}
        >
            {title}:
        </p>
        {content}
    </div>
);
