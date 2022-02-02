import ContentLoader from "react-content-loader";

const CategoriesLoader = props => {
  return (
    <ContentLoader
      speed={2}
      width={"100%"}
      height={"100%"}
      viewBox="0 0 300 460"
      backgroundColor="#e0e0e0"
      foregroundColor="#cecece"
      {...props}
    >
      <circle cx="10" cy="10" r="10" />
      <rect x="30" y="0" rx="2" ry="2" width="88%" height="20" />

      <circle cx="10" cy="50" r="10" />
      <rect x="30" y="40" rx="2" ry="2" width="88%" height="20" />

      <circle cx="10" cy="90" r="10" />
      <rect x="30" y="80" rx="2" ry="2" width="88%" height="20" />

      <circle cx="10" cy="130" r="10" />
      <rect x="30" y="120" rx="2" ry="2" width="88%" height="20" />

      <circle cx="10" cy="170" r="10" />
      <rect x="30" y="160" rx="2" ry="2" width="88%" height="20" />

      <circle cx="10" cy="210" r="10" />
      <rect x="30" y="200" rx="2" ry="2" width="88%" height="20" />

      <circle cx="10" cy="250" r="10" />
      <rect x="30" y="240" rx="2" ry="2" width="88%" height="20" />

      <circle cx="10" cy="290" r="10" />
      <rect x="30" y="280" rx="2" ry="2" width="88%" height="20" />

      <circle cx="10" cy="330" r="10" />
      <rect x="30" y="320" rx="2" ry="2" width="88%" height="20" />

      <circle cx="10" cy="370" r="10" />
      <rect x="30" y="360" rx="2" ry="2" width="88%" height="20" />

      <circle cx="10" cy="410" r="10" />
      <rect x="30" y="400" rx="2" ry="2" width="88%" height="20" />

      <circle cx="10" cy="450" r="10" />
      <rect x="30" y="440" rx="2" ry="2" width="88%" height="20" />
    </ContentLoader>
  );
};

export default CategoriesLoader;
